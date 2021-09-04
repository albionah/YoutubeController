import {Parser} from "./Parser";
import {VideoId} from "../../../DataTypes/VideoId";
import {MissingParameterInBodyData} from "./Errors/MissingParameterInBodyData";
import {HttpRequest} from "../HttpRequest";

export class VideoIdParser implements Parser<{ videoId: VideoId }>
{
    private static readonly parameterName = "videoId";

    public async parse(request: HttpRequest): Promise<{ videoId: VideoId }>
    {
        const videoId = request.body[VideoIdParser.parameterName];
        if (videoId === undefined) throw new MissingParameterInBodyData(VideoIdParser.parameterName);
        return {videoId};
    }
}
