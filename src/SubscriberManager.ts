import {Message} from "./Message";
import {Subscriber} from "./Subscriber";
import {MessageGenerator} from "./MessageGenerator";

export class SubscriberManager
{
    private readonly subscribers: Array<Subscriber>;
    private readonly messageGenerator: MessageGenerator;

    public constructor(messageGenerator: MessageGenerator)
    {
        this.messageGenerator = messageGenerator;
        this.subscribers = [];
    }

    public addSubscriber(subscriber: Subscriber): void
    {
        this.subscribers.push(subscriber);
        console.log("Počet odběratelů", this.subscribers.length);
        subscriber.sendMessage(this.messageGenerator.createInitiateSyncMessage());
    }

    public removeSubscriber(subscriber: Subscriber): void
    {
        const indexOfRemovingItem = this.subscribers.indexOf(subscriber);
        this.subscribers.splice(indexOfRemovingItem, 1);
        console.log("Počet odběratelů", this.subscribers.length);
    }

    public sendMessage(message: Message): void
    {
        this.subscribers.forEach((subscriber) => subscriber.sendMessage(message));
    }
}