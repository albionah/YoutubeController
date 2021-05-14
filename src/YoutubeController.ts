import {YoutubeInstanceAccessor} from './DataTypes/YoutubeInstanceAccessor';
import {NoSuchYoutubeInstance} from './Errors/NoSuchYoutubeInstance';
import {YoutubeInstancesManager} from './BrowserConnection/YoutubeInstancesManager';
import {YoutubeInstance} from "./DataTypes/YoutubeInstance";
import {YoutubeInstanceId} from "./DataTypes/YoutubeInstanceId";

export class YoutubeController implements YoutubeInstancesManager, YoutubeInstanceAccessor
{
    private readonly youtubeInstances: Map<YoutubeInstanceId, YoutubeInstance>;

    public constructor()
    {
        this.youtubeInstances = new Map();
    }

    public addYoutubeInstance(youtubeInstance: YoutubeInstance): void
    {
        this.youtubeInstances.set(youtubeInstance.id, youtubeInstance);
    }

    public removeYoutubeInstance(youtubeInstance: YoutubeInstance): void
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
