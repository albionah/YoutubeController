import {HttpMethod} from "./HttpMethod";
import {JsonBodyDataGetter} from "./Parsers/JsonBodyDataGetter";
import {IncomingMessage} from "http";
import {HttpRequest} from "./HttpRequest";
import {UnknownMethod} from "./UnknownMethod";

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

    private isBodySupportingMethod(currentMethod: HttpMethod): boolean
    {
        return HttpRequestBuilder.bodySupportingMethods.some((method) => method === currentMethod);
    }

    private getMethod(message: IncomingMessage)
    {
        if (!Object.values(HttpMethod).some((method) => message.method === method))
        {
            throw new UnknownMethod(message.method);
        }
        return HttpMethod[message.method];
    }
}
