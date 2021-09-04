import {Parser} from './Parser';
import {YoutubeInstanceId} from "../../../DataTypes/YoutubeInstanceId";
import {MissingParameterInBodyData} from "./Errors/MissingParameterInBodyData";
import {HttpRequest} from "../HttpRequest";

export class YoutubeInstanceIdParser implements Parser<{id: YoutubeInstanceId}>
{
    private static readonly parameterName = "youtubeInstanceId";

    public async parse(request: HttpRequest): Promise<{ id: YoutubeInstanceId }>
    {
        const id = request.body[YoutubeInstanceIdParser.parameterName];
        if (id === undefined) throw new MissingParameterInBodyData(YoutubeInstanceIdParser.parameterName);
        return {id};
    }
}
