import {Parser} from './Parser';
import {YoutubeInstanceId} from "../../../DataTypes/YoutubeInstanceId";
import {MissingParameterInBodyData} from "./Errors/MissingParameterInBodyData";
import {HttpRequest} from "../HttpRequest";

export class YoutubeInstanceIdParser implements Parser<{youtubeInstanceId: YoutubeInstanceId}>
{
    private static readonly parameterName = "youtubeInstanceId";

    public async parse(request: HttpRequest): Promise<{ youtubeInstanceId: YoutubeInstanceId }>
    {
        const youtubeInstanceId = request.body?.[YoutubeInstanceIdParser.parameterName];
        if (youtubeInstanceId === undefined) throw new MissingParameterInBodyData(YoutubeInstanceIdParser.parameterName);
        return {youtubeInstanceId};
    }
}
