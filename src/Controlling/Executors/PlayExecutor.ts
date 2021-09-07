import {YoutubeInstanceId} from "../../DataTypes/YoutubeInstanceId";
import {YoutubeInstanceAccessor} from "../../DataTypes/YoutubeInstanceAccessor";
import {Executor} from "./Executor";

export class PlayExecutor implements Executor<void>
{
    private readonly youtubeManager: YoutubeInstanceAccessor;
    private readonly youtubeInstanceId: YoutubeInstanceId;

    public constructor(youtubeManager: YoutubeInstanceAccessor, {youtubeInstanceId}: {youtubeInstanceId: YoutubeInstanceId})
    {
        this.youtubeManager = youtubeManager;
        this.youtubeInstanceId = youtubeInstanceId;
    }

    public async execute(): Promise<void>
    {
        await this.youtubeManager.get(this.youtubeInstanceId).play();
    }
}
