import {YoutubeInstanceCommander} from "../BrowserConnection/YoutubeInstanceCommander";
import {YoutubeInstance} from "../DataTypes/YoutubeInstance";
import {EventProducingBrowserYoutubeInstance} from "./EventProducingBrowserYoutubeInstance";
import {EventPublisher} from "./EventPublisher";
import {YoutubeInstanceId} from "../DataTypes/YoutubeInstanceId";
import {YoutubeInstanceBuilder} from "../BrowserConnection/YoutubeInstanceBuilder";

export class EventProducingYoutubeInstanceBuilder implements YoutubeInstanceBuilder
{
    private readonly eventPublisher: EventPublisher;

    public constructor(eventPublisher: EventPublisher)
    {
        this.eventPublisher = eventPublisher;
    }

    public build(id: YoutubeInstanceId, commander: YoutubeInstanceCommander): YoutubeInstance
    {
        return new EventProducingBrowserYoutubeInstance(id, commander, this.eventPublisher);
    }
}
