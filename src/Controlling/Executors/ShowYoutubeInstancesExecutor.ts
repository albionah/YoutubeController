import {BasicExecutor} from './BasicExecutor';
import {YoutubeInstanceInfo} from "../../DataTypes/YoutubeInstanceInfo";

export class ShowYoutubeInstancesExecutor extends BasicExecutor<undefined, ReadonlyArray<YoutubeInstanceInfo>>
{
    public async execute(): Promise<ReadonlyArray<YoutubeInstanceInfo>>
    {
        return this.youtubeManager.showAll().map((youtubeInstance) => ({instanceId: youtubeInstance.id, video: youtubeInstance.getVideoInfo()}));
    }
}
