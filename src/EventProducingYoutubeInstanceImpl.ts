import {VideoInfo} from "./DataTypes/VideoInfo";
import {YoutubeInstanceId} from "./DataTypes/YoutubeInstanceId";
import {YoutubeInstanceCommander} from "./YoutubeInstanceCommander";
import {YoutubeInstanceImpl} from "./YoutubeInstanceImpl";
import {EventPublisher} from "./EventPublisher";

export class EventProducingYoutubeInstanceImpl extends YoutubeInstanceImpl
{
    private readonly eventPublisher: EventPublisher;

    public constructor(id: YoutubeInstanceId, commander: YoutubeInstanceCommander, eventPublisher: EventPublisher)
    {
        super(id, commander);
        this.eventPublisher = eventPublisher;
    }

    public onVideoInfoReceived(videoInfo: VideoInfo): void
    {
        super.onVideoInfoReceived(videoInfo);
        this.eventPublisher.publishYoutubeInstanceChangedMessage(this.id, videoInfo);
    }
}
