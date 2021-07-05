import {JsonBodyDataGetter} from "./JsonBodyDataGetter";
import {IncomingMessage} from "http";

export class BodyJsonParser<T extends object>
{
    private readonly jsonBodyDataGetter: JsonBodyDataGetter;
    private cachedJsonBody: T | undefined;

    public constructor(jsonBodyDataGetter: JsonBodyDataGetter)
    {
        this.cachedJsonBody = undefined;
        this.jsonBodyDataGetter = jsonBodyDataGetter;
    }

    public async parse(request: IncomingMessage): Promise<T>
    {
        if (this.cachedJsonBody) return this.cachedJsonBody;
        this.cachedJsonBody = await this.jsonBodyDataGetter.getBodyData(request);
        return this.cachedJsonBody;
    }
}
