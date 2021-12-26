import {VideoSearcher} from "./VideoSearcher";
import {VideoInfo} from "./VideoInfo";
import axios, {AxiosResponse} from "axios";

export class YoutubeSearcher implements VideoSearcher
{
    public async search(query: string): Promise<ReadonlyArray<VideoInfo>>
    {
        try
        {
            const response = await this.requestYoutube();
            return this.parseVideoInfo(response);
        } catch (error)
        {
            throw new Error(`Could not get data from youtube because of ${error.message}`);
        }
    }

    private parseVideoInfo(response: AxiosResponse): ReadonlyArray<VideoInfo>
    {
        return response.data
            .contents
            .twoColumnSearchResultsRenderer
            .primaryContents
            .sectionListRenderer
            .contents[0]
            .itemSectionRenderer
            .contents
            .filter((song) => song.videoRenderer)
            .map((song) => song.videoRenderer)
            .map((song) => ({
                title: song.title.runs[0].text as string,
                id: song.videoId as string,
                thumbnails: song.thumbnail.thumbnails
            }));
    }

    private requestYoutube(): Promise<AxiosResponse>
    {
        return axios.post("https://www.youtube.com/youtubei/v1/search?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8", {
                "context": {
                    "client": {
                        // "hl": "cs",
                        // "gl": "CZ",
                        "visitorData": "CgtoWXR1d25QRHQ2TSiHusyLBg%3D%3D",
                        "clientName": "WEB",
                        "clientVersion": "2.20211019.06.00",
                    },
                },
                "query": "rammstein du hast",
            },
            {
                "headers": {
                    "Accept-Language": "cs,sk;q=0.8,en-US;q=0.5,en;q=0.3",
                    "Content-Type": "application/json",
                }
            });
    }
}
