import {VideoId, VideoInfo, YoutubeInstance, YoutubeInstanceId} from './YoutubeInstanceAccessor';

export class YoutubeInstanceImpl implements YoutubeInstance
{
    public readonly id: YoutubeInstanceId;
    private videoInfo: VideoInfo;
    private readonly client: { send: (command) => Promise<void> };

    public constructor(id: YoutubeInstanceId, client: { send: (command: object) => Promise<void> })
    {
        this.client = client;
        this.id = id;
    }

    public async watchNext(): Promise<void>
    {
        await this.client.send({type: 'watchNext'});
    }

    public async watchPrevious(): Promise<void>
    {
        await this.client.send({type: 'watchPrevious'});
    }

    public getVideoInfo(): VideoInfo
    {
        return this.videoInfo;
    }

    public onVideoInfoReceived(videoInfo: VideoInfo): void
    {
        this.videoInfo = {...this.videoInfo, ...videoInfo};
    }

    public async mute(): Promise<void>
    {
        await this.client.send({type: 'mute'});
    }

    public async pause(): Promise<void>
    {
        await this.client.send({type: 'pause'});
    }

    public async play(): Promise<void>
    {
        await this.client.send({type: 'play'});
    }

    public async stop(): Promise<void>
    {
        await this.client.send({type: 'stop'});
    }

    public async toggle(): Promise<void>
    {
        await this.client.send({type: 'toggle'});
    }

    public async watch(id: VideoId): Promise<void>
    {
        await this.client.send({type: 'watch', id});
    }
}
