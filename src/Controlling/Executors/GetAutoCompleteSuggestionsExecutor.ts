import {default as axios} from "axios";
import {Executor} from "./Executor";

export class GetAutoCompleteSuggestionsExecutor implements Executor<{query: string, results: Array<string>}>
{
    private static readonly userAgent = "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:83.0) Gecko/20100101 Firefox/83.0";

    private readonly query: string;

    public constructor({query}: {query: string})
    {
        this.query = query;
    }

    public async execute(): Promise<{ query: string; results: Array<string> }>
    {
        try
        {
            const response = await axios.get(`https://clients1.google.com/complete/search?client=youtube&hl=cs&gl=cz&gs_ri=youtube&ds=yt&q=${this.query}`, {headers: {"User-Agent": GetAutoCompleteSuggestionsExecutor.userAgent}});
            const firstBracket = response.data.indexOf("(");
            const lastBracket = response.data.lastIndexOf(")");
            const normalizedData = response.data.substring(firstBracket + 1, lastBracket);
            const parsedData = JSON.parse(normalizedData);
            const [query, results] = parsedData;
            return {query, results: results.map((opinion) => opinion[0])};
        } catch (error)
        {
            throw new Error(`Could not get data from youtube because of ${error.message}`);
        }
    }
}
