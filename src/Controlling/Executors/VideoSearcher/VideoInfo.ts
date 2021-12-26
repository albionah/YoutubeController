export interface VideoInfo
{
    id: string;
    title: string;
    thumbnails: Array<{ width: number; url: string }>;
}
