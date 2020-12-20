import {Parser} from "./Parser";
import {IncomingMessage} from "http";
import {Url} from "../../Url";

export class QueryParser implements Parser<{query: string}>
{
    public async parse(request: IncomingMessage): Promise<{ query: string }>
    {
        const query = new Url(request.url).querystring.get('query');
        if (query === null) throw new Error(`Missing query string 'query'.`);
        return {query: query};
    }
}
