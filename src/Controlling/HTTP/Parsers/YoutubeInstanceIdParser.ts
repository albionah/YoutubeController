import {IncomingMessage} from 'http';
import {Parser} from './Parser';
import {Url} from '../../../Utils/Url';
import {YoutubeInstanceId} from "../../../DataTypes/YoutubeInstanceId";

export class YoutubeInstanceIdParser implements Parser<{id: YoutubeInstanceId}>
{
    public async parse(request: IncomingMessage): Promise<{ id: YoutubeInstanceId }>
    {
        const id = new Url(request.url).querystring.get('youtubeInstanceId');
        if (id === null) throw new Error(`Missing query string 'youtubeInstanceId'.`);
        return {id};
    }
}
