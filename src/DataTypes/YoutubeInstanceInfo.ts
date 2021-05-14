import {VideoInfo} from "./VideoInfo";
import {YoutubeInstanceId} from "./YoutubeInstanceId";

export interface YoutubeInstanceInfo
{
    instanceId: YoutubeInstanceId;
    video: VideoInfo;
}
