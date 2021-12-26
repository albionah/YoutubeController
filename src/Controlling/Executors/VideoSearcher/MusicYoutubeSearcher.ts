import {VideoInfo} from "./VideoInfo";
import {VideoSearcher} from "./VideoSearcher";
import * as YoutubeMusicApi from "youtube-music-api";

export class MusicYoutubeSearcher implements VideoSearcher
{
    public async search(query: string): Promise<ReadonlyArray<VideoInfo>>
    {
        try
        {
            const api = new YoutubeMusicApi();
            await api.initalize();
            const response = await api.search(query, "SONG");
            console.debug(response);
            return response.content
                .filter((item) => item.type === "song")
                .map((item) => ({
                    id: item.videoId,
                    title: item.name,
                    ...item
                }));
        } catch (error)
        {
            throw new Error(`Could not get data from youtube because of ${error.message}`);
        }
    }
}
