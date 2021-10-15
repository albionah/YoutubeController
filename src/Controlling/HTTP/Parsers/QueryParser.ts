import {Parser} from "./Parser";
import {Url} from "../../../Utils/Url";
import {HttpRequest} from "../HttpRequest";
import {MissingParameterInQueryString} from "./Errors/MissingParameterInQueryString";
import {EmptyParameter} from "./Errors/EmptyParameter";

export class QueryParser implements Parser<{query: string}>
{
    private static readonly parameterName = "query";

    public async parse(request: HttpRequest): Promise<{ query: string }>
    {
        const query = new Url(request.url).querystring.get(QueryParser.parameterName);
        if (query === null) throw new MissingParameterInQueryString(QueryParser.parameterName);
        if (!query) throw new EmptyParameter(QueryParser.parameterName);
        return {query: query};
    }
}
