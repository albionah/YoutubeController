import {YoutubeInstanceInfo} from "../../DataTypes/YoutubeInstanceInfo";
import {YoutubeInstanceAccessor} from "../../DataTypes/YoutubeInstanceAccessor";
import {Executor} from "./Executor";

export class ShowYoutubeInstancesExecutor implements Executor<ReadonlyArray<YoutubeInstanceInfo>>
{
    private readonly youtubeManager: YoutubeInstanceAccessor;

    public constructor(youtubeManager: YoutubeInstanceAccessor)
    {
        this.youtubeManager = youtubeManager;
    }

    public async execute(): Promise<ReadonlyArray<YoutubeInstanceInfo>>
    {
        return this.youtubeManager.showAll().map((youtubeInstance) => ({youtubeInstanceId: youtubeInstance.id, videoInfo: youtubeInstance.getVideoInfo()}));
    }
}
