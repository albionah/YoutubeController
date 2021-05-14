import {YoutubeInstanceId} from "./DataTypes/YoutubeInstanceId";
import {VideoInfo} from "./DataTypes/VideoInfo";
import {SubscriberManager} from "./SubscriberManager";
import {MessageGenerator} from "./MessageGenerator";

export class EventPublisher
{
    private readonly messageGenerator: MessageGenerator;
    private readonly subscriberManager: SubscriberManager;

    public constructor(messageGenerator: MessageGenerator, subscriberManager: SubscriberManager)
    {
        this.messageGenerator = messageGenerator;
        this.subscriberManager = subscriberManager;
    }

    public publishYoutubeInstanceAddedMessage(id: YoutubeInstanceId): void
    {
        const message = this.messageGenerator.createYoutubeInstanceAddedMessage(id);
        this.subscriberManager.sendMessage(message);
    }

    public publishYoutubeInstanceRemovedMessage(id: YoutubeInstanceId): void
    {
        const message = this.messageGenerator.createYoutubeInstanceRemovedMessage(id);
        this.subscriberManager.sendMessage(message);
    }

    public publishYoutubeInstanceChangedMessage(id: YoutubeInstanceId, videoInfo: VideoInfo): void
    {
        const message = this.messageGenerator.createYoutubeInstanceChangedMessage(id, videoInfo);
        this.subscriberManager.sendMessage(message);
    }
}
