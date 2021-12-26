import {Executor} from "./Executor";
import {MusicYoutubeSearcher} from "./VideoSearcher/MusicYoutubeSearcher";


export class GetSearchResultsExecutor implements Executor<{ query: string, results: ReadonlyArray<object> }>
{
    private readonly query: string;

    public constructor({query}: {query: string})
    {
        this.query = query;
    }

    public async execute(): Promise<{ query: string, results: ReadonlyArray<object> }>
    {
        return {
            query: this.query,
            results: await new MusicYoutubeSearcher().search(this.query)
        };
    }
}
