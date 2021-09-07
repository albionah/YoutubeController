import {Executor} from "./Executor";
import * as YoutubeMusicApi from "youtube-music-api";

export class GetSearchResultsExecutor implements Executor<{ query: string, results: Array<object> }>
{
    private readonly query: string;

    public constructor({query}: {query: string})
    {
        this.query = query;
    }

    public async execute(): Promise<{ query: string, results: Array<object> }>
    {
        try
        {
            const api = new YoutubeMusicApi();
            await api.initalize();
            const response = await api.search(this.query, "SONG");
            console.debug(response);
            return {
                query: this.query,
                results: response.content
                    .filter((item) => item.type === "song")
                    .map((item) => ({
                        id: item.videoId,
                        title: item.name,
                        ...item
                    }))
            };
        } catch (error)
        {
            throw new Error(`Could not get data from youtube because of ${error.message}`);
        }
    }
}
