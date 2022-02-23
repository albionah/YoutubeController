import {YoutubeInstanceId} from "../DataTypes/YoutubeInstanceId";
import {VideoInfo} from "../DataTypes/VideoInfo";
import {MessageCreator} from "./MessageCreator";
import {Observable, Subject} from "rxjs";
import {Message} from "./Message";

export class EventPublisher
{
    private readonly messageCreator: MessageCreator;
    private readonly messages: Subject<Message>;

    public constructor(messageCreator: MessageCreator)
    {
        this.messageCreator = messageCreator;
        this.messages = new Subject<Message>();
    }

    public getMessages(): Observable<Message>
    {
        return this.messages;
    }

    public publishYoutubeInstanceAddedMessage(id: YoutubeInstanceId): void
    {
        const message = this.messageCreator.createYoutubeInstanceAddedMessage(id);
        this.messages.next(message);
    }

    public publishYoutubeInstanceRemovedMessage(id: YoutubeInstanceId): void
    {
        const message = this.messageCreator.createYoutubeInstanceRemovedMessage(id);
        this.messages.next(message);
    }

    public publishYoutubeInstanceChangedMessage(id: YoutubeInstanceId, videoInfo: VideoInfo): void
    {
        const message = this.messageCreator.createYoutubeInstanceChangedMessage(id, videoInfo);
        this.messages.next(message);
    }
}
