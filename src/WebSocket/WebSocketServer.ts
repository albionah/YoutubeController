import * as WebSocket from 'ws';
import {YoutubeInstanceImpl} from '../YoutubeInstanceImpl';
import {YoutubeInstancesManager} from '../YoutubeInstancesManager';

export class WebSocketServer
{
    private readonly youtubeInstancesManager: YoutubeInstancesManager;
    private server: WebSocket.Server;

    public constructor(youtubeInstancesManager: YoutubeInstancesManager, config: {port: number})
    {
        this.youtubeInstancesManager = youtubeInstancesManager;
        this.server = new WebSocket.Server(config);
        this.setupServer();
    }

    private setupServer()
    {
        this.server.on('connection', (client, request) => {
            console.log(`new connection from ${request.connection.remoteAddress}:${request.connection.remotePort}`);
            const youtubeInstance = new YoutubeInstanceImpl(request.connection.remotePort, {send: async (command) => client.send(JSON.stringify(command))});
            this.youtubeInstancesManager.onYoutubeInstanceConnected(youtubeInstance);

            client.on('message', (rawMessage: string) => {
                youtubeInstance.onVideoInfoReceived(JSON.parse(rawMessage));
                console.log(rawMessage);
            });
            client.on('close', (code, reason) => {
                console.log('closing connection');
                this.youtubeInstancesManager.onYoutubeInstanceClosed(youtubeInstance);
            });
        });
        this.server.on('error', ((error) => console.log(error)));
    }
}
