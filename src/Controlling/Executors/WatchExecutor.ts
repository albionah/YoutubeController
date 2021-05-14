import {BasicExecutor} from './BasicExecutor';
import {VideoId} from "../../DataTypes/VideoId";
import {YoutubeInstanceId} from "../../DataTypes/YoutubeInstanceId";

export class WatchExecutor extends BasicExecutor<{id: YoutubeInstanceId, videoId: VideoId}, void>
{
    public async execute({id, videoId}: {id: YoutubeInstanceId, videoId: VideoId}): Promise<void>
    {
        await this.youtubeManager.get(id).watch(videoId);
    }
}
