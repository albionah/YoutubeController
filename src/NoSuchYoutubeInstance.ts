import {YoutubeInstanceId} from "./DataTypes/YoutubeInstanceId";

export class NoSuchYoutubeInstance extends Error
{
    public constructor(id: YoutubeInstanceId)
    {
        super(`Youtube instance id '${id}' does not exist.`);
        Object.setPrototypeOf(this, NoSuchYoutubeInstance.prototype);
    }
}
