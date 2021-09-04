import {Executor} from "./Executor";
import * as YoutubeMusicApi from "youtube-music-api";

export class GetSearchResultsExecutor implements Executor<{ query: string }, { query: string, results: Array<object> }>
{
    public async execute({query}: { query: string }): Promise<{ query: string; results: Array<object> }>
    {
        try
        {
            const api = new YoutubeMusicApi();
            await api.initalize();
            const response = await api.search(query, "SONG");
            console.debug(response);
            return {
                query,
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
