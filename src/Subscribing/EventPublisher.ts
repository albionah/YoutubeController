import {YoutubeInstanceId} from "../DataTypes/YoutubeInstanceId";
import {VideoInfo} from "../DataTypes/VideoInfo";
import {SubscribersManager} from "./SubscribersManager";
import {MessageCreator} from "./MessageCreator";

export class EventPublisher
{
    private readonly messageCreator: MessageCreator;
    private readonly subscriberManager: SubscribersManager;

    public constructor(messageCreator: MessageCreator, subscriberManager: SubscribersManager)
    {
        this.messageCreator = messageCreator;
        this.subscriberManager = subscriberManager;
    }

    public async publishYoutubeInstanceAddedMessage(id: YoutubeInstanceId): Promise<void>
    {
        const message = this.messageCreator.createYoutubeInstanceAddedMessage(id);
        await this.subscriberManager.publishMessage(message);
    }

    public async publishYoutubeInstanceRemovedMessage(id: YoutubeInstanceId): Promise<void>
    {
        const message = this.messageCreator.createYoutubeInstanceRemovedMessage(id);
        await this.subscriberManager.publishMessage(message);
    }

    public async publishYoutubeInstanceChangedMessage(id: YoutubeInstanceId, videoInfo: VideoInfo): Promise<void>
    {
        const message = this.messageCreator.createYoutubeInstanceChangedMessage(id, videoInfo);
        await this.subscriberManager.publishMessage(message);
    }
}
