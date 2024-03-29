import * as WebSocket from 'ws';
import {YoutubeInstancesManager} from './YoutubeInstancesManager';
import {YoutubeInstanceBuilder} from "./YoutubeInstanceBuilder";
import {YoutubeInstanceCommander} from "./YoutubeInstanceCommander";
import {v4 as uuidv4} from 'uuid';

export class YoutubeInstanceWebSocketServer
{
    private readonly youtubeInstancesManager: YoutubeInstancesManager;
    private readonly youtubeInstanceBuilder: YoutubeInstanceBuilder;
    private readonly server: WebSocket.Server;

    public constructor(youtubeInstancesManager: YoutubeInstancesManager, youtubeInstanceBuilder: YoutubeInstanceBuilder, config: {port: number})
    {
        this.youtubeInstanceBuilder = youtubeInstanceBuilder;
        this.youtubeInstancesManager = youtubeInstancesManager;
        this.server = new WebSocket.Server(config);
        this.setupServer();
    }

    private setupServer(): void
    {
        this.server.on("connection", (client, request) => {
            console.debug(`new connection from ${request.socket.remoteAddress}:${request.socket.remotePort}`);
            const youtubeInstance = this.youtubeInstanceBuilder.build(uuidv4(), this.buildCommander(client));
            this.youtubeInstancesManager.addYoutubeInstance(youtubeInstance);
            let isRefreshed = true;
            const refreshing = setInterval(() => {
                if (isRefreshed)
                {
                    isRefreshed = false;
                    client.ping();
                }
                else client.terminate();
            }, 30 * 1000);

            client.on("message", (data: string | Buffer, isBinary: boolean) => {
                const rawMessage = isBinary ? data.toString() : data as string;
                youtubeInstance.onVideoInfoReceived(JSON.parse(rawMessage));
                console.debug(`incoming message from ${request.socket.remoteAddress}:${request.socket.remotePort}: ${rawMessage}`);
            });
            client.on("close", () => {
                console.debug(`closing connection coming from ${request.socket.remoteAddress}:${request.socket.remotePort}`);
                this.youtubeInstancesManager.removeYoutubeInstance(youtubeInstance);
                clearInterval(refreshing);
            });
            client.on("error", (error) => {
                console.error(`an error happened from connection ${request.socket.remoteAddress}:${request.socket.remotePort} because of ${error.message}`);
                client.terminate();
            });
            client.on("pong", () => isRefreshed = true);
        });
        this.server.on('error', ((error) => console.error(`websocket server failed because of ${error.message}`)));
    }

    private buildCommander(client: WebSocket): YoutubeInstanceCommander
    {
        return {
            send: (command) => new Promise((resolve, reject) => {
                client.send(JSON.stringify(command), (error) => {
                    if (error) reject(error);
                    else resolve();
                });
            })
        };
    }
}
