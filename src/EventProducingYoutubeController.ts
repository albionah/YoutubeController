import {EventProducingYoutubeInstanceImpl} from "./EventProducingYoutubeInstanceImpl";
import {YoutubeInstancesManager} from "./YoutubeInstancesManager";
import {EventPublisher} from "./EventPublisher";

export class EventProducingYoutubeController implements YoutubeInstancesManager
{
    private readonly eventPublisher: EventPublisher;
    private readonly originalYoutubeController: YoutubeInstancesManager;

    public constructor(originalYoutubeController: YoutubeInstancesManager, eventPublisher: EventPublisher)
    {
        this.originalYoutubeController = originalYoutubeController;
        this.eventPublisher = eventPublisher;
    }

    public addYoutubeInstance(youtubeInstance: EventProducingYoutubeInstanceImpl): void
    {
        this.originalYoutubeController.addYoutubeInstance(youtubeInstance);
        this.eventPublisher.publishYoutubeInstanceAddedMessage(youtubeInstance.id);
    }

    public removeYoutubeInstance(youtubeInstance: EventProducingYoutubeInstanceImpl): void
    {
        this.originalYoutubeController.removeYoutubeInstance(youtubeInstance);
        this.eventPublisher.publishYoutubeInstanceRemovedMessage(youtubeInstance.id);
    }
}
