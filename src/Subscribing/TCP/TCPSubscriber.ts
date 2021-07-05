import {Subscriber} from "../Subscriber";
import {Message} from "../Message";
import {Socket} from "net";

export class TCPSubscriber implements Subscriber
{
    private static readonly nullTerminatingCharacter = Buffer.alloc(1, 0);
    private readonly socket: Socket;

    public constructor(socket: Socket)
    {
        this.socket = socket;
    }

    public async sendMessage(message: Message): Promise<void>
    {
        return new Promise((resolve, reject) => {
            const buffer = this.getRawData(message);
            this.socket.write(buffer, (error) => {
                if (error) reject(error);
                else resolve();
            });
        });
    }

    private getRawData(message: Message): Buffer
    {
        const stringifiedMessage = JSON.stringify(message);
        return Buffer.concat([Buffer.from(stringifiedMessage), TCPSubscriber.nullTerminatingCharacter]);
    }
}
