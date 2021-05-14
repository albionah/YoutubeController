import {VideoInfo} from "./VideoInfo";
import {VideoId} from "./VideoId";
import {YoutubeInstanceId} from "./YoutubeInstanceId";

export interface YoutubeInstance
{
    readonly id: YoutubeInstanceId;
    getVideoInfo(): VideoInfo;
    onVideoInfoReceived(info: VideoInfo): void;
    watch(id: VideoId): Promise<void>;
    pause(): Promise<void>;
    stop(): Promise<void>;
    play(): Promise<void>;
    watchNext(): Promise<void>;
    watchPrevious(): Promise<void>;
    toggle(): Promise<void>;
    mute(): Promise<void>;
}
