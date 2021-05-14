import {YoutubeInstanceCommander} from "./YoutubeInstanceCommander";
import {YoutubeInstance} from "./DataTypes/YoutubeInstance";
import {EventProducingYoutubeInstanceImpl} from "./EventProducingYoutubeInstanceImpl";
import {EventPublisher} from "./EventPublisher";

export class YoutubeInstanceBuilder
{
    private readonly eventPublisher: EventPublisher;

    public constructor(eventPublisher: EventPublisher)
    {
        this.eventPublisher = eventPublisher;
    }
    public build(id: number, commander: YoutubeInstanceCommander): YoutubeInstance
    {
        return new EventProducingYoutubeInstanceImpl(id, commander, this.eventPublisher);
    }
}
