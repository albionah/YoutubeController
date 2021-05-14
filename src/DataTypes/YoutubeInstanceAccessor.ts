import {YoutubeInstance} from "./YoutubeInstance";
import {YoutubeInstanceId} from "./YoutubeInstanceId";

export interface YoutubeInstanceAccessor
{
    showAll(): ReadonlyArray<YoutubeInstance>;
    get(id: YoutubeInstanceId): YoutubeInstance;
}
