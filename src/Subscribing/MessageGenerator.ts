import {YoutubeInstanceId} from "../DataTypes/YoutubeInstanceId";
import {VideoInfo} from "../DataTypes/VideoInfo";
import {Message} from "./Message";
import {ShowYoutubeInstancesExecutor} from "../Controlling/Executors/ShowYoutubeInstancesExecutor";

export class MessageGenerator
{
    private readonly showYoutubeInstancesExecutor: ShowYoutubeInstancesExecutor;

    public constructor(showYoutubeInstancesExecutor: ShowYoutubeInstancesExecutor)
    {
        this.showYoutubeInstancesExecutor = showYoutubeInstancesExecutor;
    }

    public createInitiateSyncMessage(): Message
    {
        const data = this.showYoutubeInstancesExecutor.execute();
        return {type: "InitiateSyncMessage", data};
    }

    public createYoutubeInstanceAddedMessage(id: YoutubeInstanceId): Message
    {
        return {type: "YoutubeInstanceAdded", data: {id}};
    }

    public createYoutubeInstanceRemovedMessage(id: YoutubeInstanceId): Message
    {
        return {type: "YoutubeInstanceRemoved", data: {id}};
    }

    public createYoutubeInstanceChangedMessage(id: YoutubeInstanceId, videoInfo: VideoInfo): Message
    {
        return {type: "YoutubeInstanceChanged", data: {id, videoInfo}};
    }
}
