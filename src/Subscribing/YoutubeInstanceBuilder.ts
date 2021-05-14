import {YoutubeInstanceCommander} from "../BrowserConnection/YoutubeInstanceCommander";
import {YoutubeInstance} from "../DataTypes/YoutubeInstance";
import {EventProducingBrowserYoutubeInstance} from "./EventProducingBrowserYoutubeInstance";
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
        return new EventProducingBrowserYoutubeInstance(id, commander, this.eventPublisher);
    }
}
