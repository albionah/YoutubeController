import {YoutubeInstanceId} from "../DataTypes/YoutubeInstanceId";
import {YoutubeInstanceCommander} from "./YoutubeInstanceCommander";
import {YoutubeInstance} from "../DataTypes/YoutubeInstance";

export interface YoutubeInstanceBuilder
{
    build(id: YoutubeInstanceId, commander: YoutubeInstanceCommander): YoutubeInstance;
}
