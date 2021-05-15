import {SubscribersManager} from "../SubscribersManager";
import {Server} from "net";
import {TCPSubscriber} from "./TCPSubscriber";

export class SubscriberTCPServer
{
    private readonly server: Server;
    private readonly subscriberManager: SubscribersManager;

    public constructor(config: { port: number }, subscriberManager: SubscribersManager)
    {
        this.subscriberManager = subscriberManager;
        this.server = new Server();
        this.setupServer();
        this.server.listen(config.port);
    }

    private setupServer(): void
    {
        this.server.on('connection', (socket) => {
            console.log("new TCP connection");
            const subscriber = new TCPSubscriber(socket);
            this.subscriberManager.addSubscriber(subscriber);
            socket.on("close", () => {
                this.subscriberManager.removeSubscriber(subscriber);
            });
        });
        this.server.on('error', ((error) => console.error(error.message)));
    }
}
