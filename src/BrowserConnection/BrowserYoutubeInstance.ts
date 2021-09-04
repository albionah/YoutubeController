import {YoutubeInstanceCommander} from "./YoutubeInstanceCommander";
import {VideoInfo} from "../DataTypes/VideoInfo";
import {YoutubeInstance} from "../DataTypes/YoutubeInstance";
import {VideoId} from "../DataTypes/VideoId";
import {YoutubeInstanceId} from "../DataTypes/YoutubeInstanceId";

export class BrowserYoutubeInstance implements YoutubeInstance
{
    public readonly id: YoutubeInstanceId;
    private readonly commander: YoutubeInstanceCommander;
    private videoInfo: VideoInfo;

    public constructor(id: YoutubeInstanceId, commander: YoutubeInstanceCommander)
    {
        this.commander = commander;
        this.id = id;
    }

    public async watchNext(): Promise<void>
    {
        await this.commander.send({type: 'watchNext'});
    }

    public async watchPrevious(): Promise<void>
    {
        await this.commander.send({type: 'watchPrevious'});
    }

    public getVideoInfo(): VideoInfo
    {
        return this.videoInfo;
    }

    public onVideoInfoReceived(videoInfo: VideoInfo): void
    {
        console.debug("onVideoInfoReceived", videoInfo);
        this.videoInfo = {...this.videoInfo, ...videoInfo};
    }

    public async mute(): Promise<void>
    {
        await this.commander.send({type: 'mute'});
    }

    public async pause(): Promise<void>
    {
        await this.commander.send({type: 'pause'});
    }

    public async play(): Promise<void>
    {
        await this.commander.send({type: 'play'});
    }

    public async stop(): Promise<void>
    {
        await this.commander.send({type: 'stop'});
    }

    public async toggle(): Promise<void>
    {
        await this.commander.send({type: 'toggle'});
    }

    public async watch(id: VideoId): Promise<void>
    {
        await this.commander.send({type: 'watch', id});
    }
}
