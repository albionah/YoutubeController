import {BAD_REQUEST, INTERNAL_SERVER_ERROR, METHOD_NOT_ALLOWED, NOT_FOUND, OK} from 'http-status-codes';
import {HttpResponseOptions} from './HttpResponseOptions';
import {UnknownRoute} from "./ExecutorBuilders/Errors/UnknownRoute";
import {UnsupportedMethod} from "./ExecutorBuilders/Errors/UnsupportedMethod";
import {ExecutorBuilder} from "./ExecutorBuilders/ExecutorBuilder";
import {HttpRequestBuilder} from "./HttpRequestBuilder";
import {IncomingMessage} from "http";
import {UnknownCommand} from "./ExecutorBuilders/Errors/UnknownCommand";
import {MissingParameterInBodyData} from "./Parsers/Errors/MissingParameterInBodyData";

export class HttpApi
{
    private readonly httpRequestBuilder: HttpRequestBuilder;
    private readonly executorBuilder: ExecutorBuilder<any>;

    public constructor(httpRequestBuilder: HttpRequestBuilder, executorBuilder: ExecutorBuilder<any>)
    {
        this.httpRequestBuilder = httpRequestBuilder;
        this.executorBuilder = executorBuilder;
    }

    public async handle(message: IncomingMessage): Promise<HttpResponseOptions<unknown>>
    {
        try
        {
            console.debug("handling request", `${message.method} ${message.url}`);
            const request = await this.httpRequestBuilder.build(message);
            const executor = await this.executorBuilder.build(request);
            const data = await executor.execute();
            return {statusCode: OK, data: data ?? {}};
        } catch (error)
        {
            return this.handleError(error);
        }
    }

    private handleError(error: Error): HttpResponseOptions<unknown>
    {
        if (error instanceof UnknownRoute)
        {
            return {statusCode: NOT_FOUND, data: {error: error.message}};
        }
        if (error instanceof UnsupportedMethod)
        {
            return {
                statusCode: METHOD_NOT_ALLOWED,
                data: {error: error.message}
            };
        }
        if (error instanceof MissingParameterInBodyData || error instanceof UnknownCommand)
        {
            return {
                statusCode: BAD_REQUEST,
                data: {error: error.message}
            };
        }
        return {statusCode: INTERNAL_SERVER_ERROR, data: {error: error.message}};
    }
}
