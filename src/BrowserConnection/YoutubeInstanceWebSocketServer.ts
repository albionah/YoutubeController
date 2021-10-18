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
        this.server.on('connection', (client, request) => {
            console.debug(`new connection from ${request.connection.remoteAddress}:${request.connection.remotePort}`);
            const youtubeInstance = this.youtubeInstanceBuilder.build(uuidv4(), this.buildCommander(client));
            this.youtubeInstancesManager.addYoutubeInstance(youtubeInstance);

            client.on('message', (rawMessage: string) => {
                youtubeInstance.onVideoInfoReceived(JSON.parse(rawMessage));
                console.debug(rawMessage);
            });
            client.on('close', (code, reason) => {
                console.debug('closing connection');
                this.youtubeInstancesManager.removeYoutubeInstance(youtubeInstance);
            });
            client.on("error", (error) => console.log(error.message));
        });
        this.server.on('error', ((error) => console.error(error.message)));
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
