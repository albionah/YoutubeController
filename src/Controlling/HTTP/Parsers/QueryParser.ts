import {Parser} from "./Parser";
import {Url} from "../../../Utils/Url";
import {HttpRequest} from "../HttpRequest";

export class QueryParser implements Parser<{query: string}>
{
    public async parse(request: HttpRequest): Promise<{ query: string }>
    {
        const query = new Url(request.url).querystring.get('query');
        if (query === null) throw new Error(`Missing query string 'query'.`);
        return {query: query};
    }
}
