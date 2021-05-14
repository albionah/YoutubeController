import {VideoId} from "./VideoId";

export interface VideoInfo
{
    videoId: VideoId;
    title: string;
    length: number;
    duration: number;
    currentPosition: number;
}
