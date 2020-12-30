import * as WebSocket from 'ws';
import {YoutubeInstancesManager} from '../YoutubeInstancesManager';
import {YoutubeInstanceBuilder} from "../YoutubeInstanceBuilder";

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
            const youtubeInstance = this.youtubeInstanceBuilder.build(request.connection.remotePort, {send: async (command) => client.send(JSON.stringify(command))});
            this.youtubeInstancesManager.addYoutubeInstance(youtubeInstance);

            client.on('message', (rawMessage: string) => {
                youtubeInstance.onVideoInfoReceived(JSON.parse(rawMessage));
                console.debug(rawMessage);
            });
            client.on('close', (code, reason) => {
                console.debug('closing connection');
                this.youtubeInstancesManager.removeYoutubeInstance(youtubeInstance);
            });
        });
        this.server.on('error', ((error) => console.error(error)));
    }
}
