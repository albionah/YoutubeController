import {YoutubeInstance} from './YoutubeInstanceAccessor';

export interface YoutubeInstancesManager
{
    onYoutubeInstanceConnected(youtubeInstance: YoutubeInstance): void;
    onYoutubeInstanceClosed(youtubeInstance: YoutubeInstance): void;
}
