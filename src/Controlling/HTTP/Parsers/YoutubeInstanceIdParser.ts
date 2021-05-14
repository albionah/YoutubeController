import {IncomingMessage} from 'http';
import {Parser} from './Parser';
import {Url} from '../../../Utils/Url';

export class YoutubeInstanceIdParser implements Parser<{id: number}>
{
    public async parse(request: IncomingMessage): Promise<{ id: number }>
    {
        const id = new Url(request.url).querystring.get('youtubeInstanceId');
        if (id === null) throw new Error(`Missing query string 'youtubeInstanceId'.`);
        return {id: Number.parseInt(id)};
    }
}
