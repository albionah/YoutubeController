import {YoutubeInstance, YoutubeInstanceAccessor, YoutubeInstanceId} from './YoutubeInstanceAccessor';
import {NoSuchYoutubeInstance} from './NoSuchYoutubeInstance';
import {YoutubeInstancesManager} from './YoutubeInstancesManager';

export class YoutubeController implements YoutubeInstancesManager, YoutubeInstanceAccessor
{
    private readonly youtubeInstances: Map<YoutubeInstanceId, YoutubeInstance>;

    public constructor()
    {
        this.youtubeInstances = new Map();
    }

    public onYoutubeInstanceConnected(youtubeInstance: YoutubeInstance): void
    {
        this.youtubeInstances.set(youtubeInstance.id, youtubeInstance);
    }

    public onYoutubeInstanceClosed(youtubeInstance: YoutubeInstance): void
    {
        this.youtubeInstances.delete(youtubeInstance.id);
    }

    public get(id: YoutubeInstanceId): YoutubeInstance
    {
        if (this.youtubeInstances.has(id))
        {
            return this.youtubeInstances.get(id);
        }
        throw new NoSuchYoutubeInstance(id);
    }

    public showAll(): ReadonlyArray<YoutubeInstance>
    {
        return Array.from(this.youtubeInstances.values());
    }

}
