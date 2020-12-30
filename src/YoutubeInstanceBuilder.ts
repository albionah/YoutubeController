import {YoutubeInstance} from "./YoutubeInstanceAccessor";
import {YoutubeInstanceImpl} from "./YoutubeInstanceImpl";
import {YoutubeInstanceCommander} from "./YoutubeInstanceCommander";

export class YoutubeInstanceBuilder
{
    public build(id: number, commander: YoutubeInstanceCommander): YoutubeInstance
    {
        return new YoutubeInstanceImpl(id, commander);
    }
}
