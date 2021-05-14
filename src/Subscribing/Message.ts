export type MessageType = "InitialSyncMessage" | "YoutubeInstanceAdded" | "YoutubeInstanceRemoved" | "YoutubeInstanceChanged";

export interface Message
{
    type: MessageType,
    data?: object;
}
