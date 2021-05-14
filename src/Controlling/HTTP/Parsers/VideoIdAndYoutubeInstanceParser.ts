import {YoutubeInstanceIdParser} from './YoutubeInstanceIdParser';
import {IncomingMessage} from "http";
import {Parser} from "./Parser";
import {JsonBodyDataGetter} from "./JsonBodyDataGetter";
import {VideoId} from "../../../DataTypes/VideoId";
import {YoutubeInstanceId} from "../../../DataTypes/YoutubeInstanceId";

export class VideoIdAndYoutubeInstanceParser extends YoutubeInstanceIdParser implements Parser<{ id: YoutubeInstanceId, videoId: VideoId }>
{
    private readonly jsonBodyDataGetter: JsonBodyDataGetter;

    public constructor(jsonBodyDataGetter: JsonBodyDataGetter)
    {
        super();
        this.jsonBodyDataGetter = jsonBodyDataGetter;
    }

    public async parse(request: IncomingMessage): Promise<{ id: YoutubeInstanceId, videoId: VideoId }>
    {
        const body = await this.jsonBodyDataGetter.getBodyData(request);
        const videoId = body.videoId;
        if (!videoId) throw new Error(`Missing body parameter 'videoId'.`);
        return {...(await super.parse(request)), videoId};
    }
}
