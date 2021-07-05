import {IncomingMessage} from "http";
import {Parser} from "./Parser";
import {VideoId} from "../../../DataTypes/VideoId";
import {BodyJsonParser} from "./BodyJsonParser";
import {MissingParameterInBodyData} from "./Errors/MissingParameterInBodyData";


export class VideoIdParser implements Parser<{ videoId: VideoId }>
{
    private static readonly parameterName = "videoId";

    private readonly jsonParser: BodyJsonParser<{ videoId?: VideoId }>;

    public constructor(jsonParser: BodyJsonParser<{ videoId?: VideoId }>)
    {
        this.jsonParser = jsonParser;
    }

    public async parse(request: IncomingMessage): Promise<{ videoId: VideoId }>
    {
        const jsonBody = await this.jsonParser.parse(request);
        const videoId = jsonBody[VideoIdParser.parameterName];
        if (videoId === undefined) throw new MissingParameterInBodyData(VideoIdParser.parameterName);
        return {videoId};
    }
}
