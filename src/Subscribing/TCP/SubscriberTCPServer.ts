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
            console.debug("new TCP connection");
            const subscriber = new TCPSubscriber(socket);
            this.subscriberManager.addSubscriber(subscriber);
            socket.on("close", () => {
                console.debug("closing TCP connection");
                this.subscriberManager.removeSubscriber(subscriber);
            });
            socket.on("error", (error) => {
                console.error(`Connection error: ${error.message}`);
            });
        });
        this.server.on('error', ((error) => console.error(`Server error: ${error.message}`)));
    }
}
