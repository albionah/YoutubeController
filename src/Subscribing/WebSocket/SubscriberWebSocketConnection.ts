import * as WebSocket from "ws";
import {IncomingMessage} from "http";

type SendFn = (message: object) => void;

// TODO: remove this class
export class SubscriberWebSocketConnection
{
    private readonly controller;
    private readonly connection: WebSocket;
    private readonly request: IncomingMessage;
    private readonly send: SendFn;

    public constructor(controller, connection: WebSocket, request: IncomingMessage)
    {
        this.send = (message) => connection.send(JSON.stringify(message));
        this.request = request;
        this.connection = connection;
        this.controller = controller;
    }

    public init(): void
    {
        this.sendCurrentState();
        this.setOnConnectionHandling();
        this.setOnCloseHandling();
    }

    private setOnConnectionHandling(): void
    {
        const {remoteAddress, remotePort} = this.request.connection;
        console.debug(`new connection coming from ${remoteAddress}:${remotePort}`);
        this.controller.addListener(this.send);
    }

    private setOnCloseHandling()
    {
        this.connection.on('close', () => {
            const {remoteAddress, remotePort} = this.request.connection;
            console.debug(`closing connection to ${remoteAddress}:${remotePort}`);
            this.controller.removeListener(this.send);
        });
    }

    private sendCurrentState(): void
    {
        this.send({
            type: "AllYoutubeInstances",
            data: this.controller.showAll().map((youtubeInstance) => ({
                instanceId: youtubeInstance.id,
                video: youtubeInstance.getVideoInfo()
            }))
        });
    }
}
