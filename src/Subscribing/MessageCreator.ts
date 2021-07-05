import {YoutubeInstanceId} from "../DataTypes/YoutubeInstanceId";
import {VideoInfo} from "../DataTypes/VideoInfo";
import {Message} from "./Message";
import {ShowYoutubeInstancesExecutor} from "../Controlling/Executors/ShowYoutubeInstancesExecutor";

export class MessageCreator
{
    private readonly showYoutubeInstancesExecutor: ShowYoutubeInstancesExecutor;

    public constructor(showYoutubeInstancesExecutor: ShowYoutubeInstancesExecutor)
    {
        this.showYoutubeInstancesExecutor = showYoutubeInstancesExecutor;
    }

    public async createInitialSyncMessage(): Promise<Message>
    {
        const data = await this.showYoutubeInstancesExecutor.execute();
        return {type: "InitialSyncMessage", data};
    }

    public createYoutubeInstanceAddedMessage(youtubeInstanceId: YoutubeInstanceId): Message
    {
        return {type: "YoutubeInstanceAdded", data: {youtubeInstanceId}};
    }

    public createYoutubeInstanceRemovedMessage(youtubeInstanceId: YoutubeInstanceId): Message
    {
        return {type: "YoutubeInstanceRemoved", data: {youtubeInstanceId}};
    }

    public createYoutubeInstanceChangedMessage(youtubeInstanceId: YoutubeInstanceId, videoInfo: VideoInfo): Message
    {
        return {type: "YoutubeInstanceChanged", data: {youtubeInstanceId, videoInfo}};
    }
}
