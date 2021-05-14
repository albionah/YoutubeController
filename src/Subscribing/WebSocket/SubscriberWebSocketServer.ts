import * as WebSocket from 'ws';
import {SubscriberManager} from "../SubscriberManager";
import {WebSocketSubscriber} from "./WebSocketSubscriber";

export class SubscriberWebSocketServer
{
    private readonly server: WebSocket.Server;
    private readonly subscriberManager: SubscriberManager;

    public constructor(config: { port: number }, subscriberManager: SubscriberManager)
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
