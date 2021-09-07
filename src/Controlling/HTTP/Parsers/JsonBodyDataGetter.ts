import {IncomingMessage} from "http";
import {RequestTimeout} from "./Errors/RequestTimeout";
import {UnsupportedHttpContentType} from "./Errors/UnsupportedHttpContentType";

export type Json = any;

export class JsonBodyDataGetter
{
    private readonly maxUploadTimeInMs: number;

    public constructor(maxUploadTimeInMs: number)
    {
        this.maxUploadTimeInMs = maxUploadTimeInMs;
    }

    public async getBodyData(message: IncomingMessage): Promise<Json>
    {
        this.checkHttpContentType(message);
        const body = await this.waitForBody(message);
        return this.parseToJson(body.toString());
    }

    private checkHttpContentType(request: IncomingMessage): void
    {
        if (request.headers['content-type']?.toLowerCase() !== 'application/json')
        {
            throw new UnsupportedHttpContentType(request.headers['content-type']);
        }
    }

    private waitForBody(request: IncomingMessage): Promise<Buffer>
    {
        return new Promise((resolve, reject) => {
            const timeoutWatcher = setTimeout(() => reject(new RequestTimeout(this.maxUploadTimeInMs)), this.maxUploadTimeInMs);
            const chunks: Array<Buffer> = [];
            request.on('data', (chunk) => {
                chunks.push(chunk);
            });
            request.on('end', () => {
                clearTimeout(timeoutWatcher);
                resolve(Buffer.concat(chunks));
            });
        });
    }

    private parseToJson(body: string): Json
    {
        try
        {
            return JSON.parse(body);
        } catch (error)
        {
            throw new Error(`Cannot parse json from body data because of ${error.message}`);
        }
    }
}
