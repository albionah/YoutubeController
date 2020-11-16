import {YoutubeInstanceInfo} from '../../YoutubeInstanceAccessor';
import {BasicExecutor} from './BasicExecutor';

export class ShowYoutubeInstancesExecutor extends BasicExecutor<undefined, ReadonlyArray<YoutubeInstanceInfo>>
{
    public async execute(): Promise<ReadonlyArray<YoutubeInstanceInfo>>
    {
        return this.youtubeManager.showAll().map((youtubeInstance) => ({instanceId: youtubeInstance.id, video: youtubeInstance.getVideoInfo()}));
    }
}
