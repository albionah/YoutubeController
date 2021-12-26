import {VideoInfo} from "./VideoInfo";

export interface VideoSearcher
{
    search(query: string): Promise<ReadonlyArray<VideoInfo>>;
}

