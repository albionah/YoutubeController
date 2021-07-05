import {IncomingMessage} from 'http';
import {Parser} from './Parser';
import {YoutubeInstanceId} from "../../../DataTypes/YoutubeInstanceId";
import {BodyJsonParser} from "./BodyJsonParser";

export class YoutubeInstanceIdParser implements Parser<{id: YoutubeInstanceId}>
{
    private static readonly parameterName = "youtubeInstanceId";

    private readonly jsonParser: BodyJsonParser<{ youtubeInstanceId?: string }>;

    public constructor(jsonParser: BodyJsonParser<{youtubeInstanceId?: string}>)
    {
        this.jsonParser = jsonParser;
    }

    public async parse(request: IncomingMessage): Promise<{ id: YoutubeInstanceId }>
    {
        const json = await this.jsonParser.parse(request);
        const id = json[YoutubeInstanceIdParser.parameterName];
        if (id === undefined) throw new Error(`Missing '${YoutubeInstanceIdParser.parameterName}' in body data.`);
        return {id};
    }
}
