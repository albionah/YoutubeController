import {BasicExecutor} from './BasicExecutor';
import {YoutubeInstanceId} from "../../DataTypes/YoutubeInstanceId";

export class PauseExecutor extends BasicExecutor<{id: YoutubeInstanceId}, void>
{
    public async execute({id}: {id: YoutubeInstanceId}): Promise<void>
    {
        await this.youtubeManager.get(id).pause();
    }
}
