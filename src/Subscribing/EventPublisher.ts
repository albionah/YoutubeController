import {YoutubeInstanceId} from "../DataTypes/YoutubeInstanceId";
import {VideoInfo} from "../DataTypes/VideoInfo";
import {SubscriberManager} from "./SubscriberManager";
import {MessageCreator} from "./MessageCreator";

export class EventPublisher
{
    private readonly messageCreator: MessageCreator;
    private readonly subscriberManager: SubscriberManager;

    public constructor(messageCreator: MessageCreator, subscriberManager: SubscriberManager)
    {
        this.messageCreator = messageCreator;
        this.subscriberManager = subscriberManager;
    }

    public publishYoutubeInstanceAddedMessage(id: YoutubeInstanceId): void
    {
        const message = this.messageCreator.createYoutubeInstanceAddedMessage(id);
        this.subscriberManager.sendMessage(message);
    }

    public publishYoutubeInstanceRemovedMessage(id: YoutubeInstanceId): void
    {
        const message = this.messageCreator.createYoutubeInstanceRemovedMessage(id);
        this.subscriberManager.sendMessage(message);
    }

    public publishYoutubeInstanceChangedMessage(id: YoutubeInstanceId, videoInfo: VideoInfo): void
    {
        const message = this.messageCreator.createYoutubeInstanceChangedMessage(id, videoInfo);
        this.subscriberManager.sendMessage(message);
    }
}
