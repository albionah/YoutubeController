import * as WebSocket from 'ws';
import {SubscribersManager} from "../SubscribersManager";
import {WebSocketSubscriber} from "./WebSocketSubscriber";

export class SubscriberWebSocketServer
{
    private readonly server: WebSocket.Server;
    private readonly subscriberManager: SubscribersManager;

    public constructor(config: { port: number }, subscriberManager: SubscribersManager)
    {
        this.subscriberManager = subscriberManager;
        this.server = new WebSocket.Server(config);
        this.setupServer();
    }

    private setupServer(): void
    {
        this.server.on('connection', (connection, request) => {
            console.log("new connection");
            const subscriber = new WebSocketSubscriber(connection);
            this.subscriberManager.addSubscriber(subscriber);
            connection.on("close", () => {
                this.subscriberManager.removeSubscriber(subscriber);
            });
        });
        this.server.on('error', ((error) => console.error(error.message)));
    }
}
