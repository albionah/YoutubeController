import {Message} from "./Message";
import {Subscriber} from "./Subscriber";
import {MessageCreator} from "./MessageCreator";

export class SubscribersManager
{
    private readonly subscribers: Array<Subscriber>;
    private readonly messageCreator: MessageCreator;

    public constructor(messageCreator: MessageCreator)
    {
        this.messageCreator = messageCreator;
        this.subscribers = [];
    }

    public async addSubscriber(subscriber: Subscriber): Promise<void>
    {
        this.subscribers.push(subscriber);
        const initialSyncMessage = await this.messageCreator.createInitialSyncMessage();
        await subscriber.sendMessage(initialSyncMessage);
    }

    public removeSubscriber(subscriber: Subscriber): void
    {
        const indexOfRemovingItem = this.subscribers.indexOf(subscriber);
        this.subscribers.splice(indexOfRemovingItem, 1);
    }

    public publishMessage(message: Message): Promise<void>
    {
        const promises = this.subscribers.map((subscriber) => subscriber.sendMessage(message));
        return Promise.all(promises).then();
    }
}
