import {Subscriber} from "../Subscriber";
import {Message} from "../Message";
import * as WebSocket from "ws";

export class WebSocketSubscriber implements Subscriber
{
    private readonly connection: WebSocket;

    public constructor(connection: WebSocket)
    {
        this.connection = connection;
    }

    public sendMessage(message: Message): void
    {
        this.connection.send(JSON.stringify(message));
    }
}
