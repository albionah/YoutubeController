import {BasicExecutor} from './BasicExecutor';
import {VideoId} from "../../DataTypes/VideoId";

export class WatchExecutor extends BasicExecutor<{id: number, videoId: VideoId}, void>
{
    public async execute({id, videoId}: {id: number, videoId: VideoId}): Promise<void>
    {
        await this.youtubeManager.get(id).watch(videoId);
    }
}
