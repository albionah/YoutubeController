export type MessageType = "InitiateSyncMessage" | "YoutubeInstanceAdded" | "YoutubeInstanceRemoved" | "YoutubeInstanceChanged";

export interface Message
{
    type: MessageType,
    data?: object;
}
