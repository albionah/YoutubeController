export type YoutubeInstanceId = number;
export type VideoId = string;

export interface VideoInfo
{
    videoId: VideoId;
    title: string;
    length: number;
    duration: number;
    currentPosition: number;
}

export interface YoutubeInstanceInfo
{
    instanceId: number;
    video: VideoInfo;
}

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

export interface YoutubeInstanceAccessor
{
    showAll(): ReadonlyArray<YoutubeInstance>;
    get(id: YoutubeInstanceId): YoutubeInstance;
}
