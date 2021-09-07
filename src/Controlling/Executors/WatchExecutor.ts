import {VideoId} from "../../DataTypes/VideoId";
import {YoutubeInstanceId} from "../../DataTypes/YoutubeInstanceId";
import {Executor} from "./Executor";
import {YoutubeInstanceAccessor} from "../../DataTypes/YoutubeInstanceAccessor";

export class WatchExecutor implements Executor<void>
{
    private readonly youtubeManager: YoutubeInstanceAccessor;
    private readonly youtubeInstanceId: YoutubeInstanceId;
    private readonly videoId: VideoId;

    public constructor(youtubeManager: YoutubeInstanceAccessor, {youtubeInstanceId, videoId}: {youtubeInstanceId: YoutubeInstanceId, videoId: VideoId})
    {
        this.youtubeManager = youtubeManager;
        this.youtubeInstanceId = youtubeInstanceId;
        this.videoId = videoId;
    }

    public async execute(): Promise<void>
    {
        await this.youtubeManager.get(this.youtubeInstanceId).watch(this.videoId);
    }
}
