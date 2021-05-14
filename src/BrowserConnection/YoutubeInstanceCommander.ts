export interface YoutubeInstanceCommander
{
    send: (command: object) => Promise<void>;
}
