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

    public async sendMessage(message: Message): Promise<void>
    {
        return new Promise((resolve, reject) => {
            this.connection.send(JSON.stringify(message), (error) => {
                if (error) reject(error);
                else resolve();
            });
        });
    }
}
