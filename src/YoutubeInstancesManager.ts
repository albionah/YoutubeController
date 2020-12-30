import {YoutubeInstance} from './YoutubeInstanceAccessor';

export interface YoutubeInstancesManager
{
    addYoutubeInstance(youtubeInstance: YoutubeInstance): void;
    removeYoutubeInstance(youtubeInstance: YoutubeInstance): void;
}
