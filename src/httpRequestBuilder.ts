import {HttpMethod} from "./Controlling/HTTP/HttpMethod";
import {JsonBodyDataGetter} from "./Controlling/HTTP/Parsers/JsonBodyDataGetter";
import {IncomingMessage} from "http";
import {HttpRequest} from "./Controlling/HTTP/HttpRequest";

export class HttpRequestBuilder
{
    private static readonly bodySupportingMethods = [HttpMethod.POST];
    private readonly jsonBodyDataGetter: JsonBodyDataGetter;

    public constructor(jsonBodyDataGetter: JsonBodyDataGetter)
    {
        this.jsonBodyDataGetter = jsonBodyDataGetter;
    }

    public async build(message: IncomingMessage): Promise<HttpRequest>
    {
        const method = this.getMethod(message);
        return {
            method,
            url: message.url,
            ...(this.isBodySupportingMethod(method) && {body: await this.jsonBodyDataGetter.getBodyData(message)})
        };
    }

    private isBodySupportingMethod(method: HttpMethod): boolean
    {
        return HttpRequestBuilder.bodySupportingMethods.some((b) => b === method);
    }

    private getMethod(message: IncomingMessage)
    {
        if (!Object.values(HttpMethod).some((method) => message.method === method))
        {
            throw new Error("Request contains unsupported method");
        }
        return HttpMethod[message.method];
    }
}
