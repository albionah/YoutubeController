import {YoutubeInstance} from "../DataTypes/YoutubeInstance";

export interface YoutubeInstancesManager
{
    addYoutubeInstance(youtubeInstance: YoutubeInstance): void;
    removeYoutubeInstance(youtubeInstance: YoutubeInstance): void;
}
