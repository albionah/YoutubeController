import {Message} from "./Message";

export interface Subscriber
{
    sendMessage(message: Message): void;
}
