import {IncomingMessage} from 'http';
import {BAD_REQUEST, INTERNAL_SERVER_ERROR, OK} from 'http-status-codes';
import {HttpEndpointDefinition} from './httpEndpointDefinitions';
import {HttpResponseOptions} from './HttpResponseOptions';
import {Url} from '../../Url';

export class HttpApi
{
    private readonly endpoints: { [key: string]: HttpEndpointDefinition<unknown, unknown> };

    public constructor(endpointDefinitions: Iterable<HttpEndpointDefinition<unknown, unknown>>)
    {
        this.endpoints = this.transformEndpoints(endpointDefinitions);
    }

    public async handle(request: IncomingMessage): Promise<HttpResponseOptions<unknown>>
    {
        console.log(request.url);
        try
        {
            const matchEndpoint = this.endpoints[new Url(request.url).route];
            if (matchEndpoint)
            {
                if (request.method === matchEndpoint.method)
                {
                    try
                    {
                        const options = await matchEndpoint.parser?.parse(request);
                        return {statusCode: OK, data: await matchEndpoint.executor.execute(options) ?? {}};
                    } catch (error)
                    {
                        return {statusCode: INTERNAL_SERVER_ERROR, data: {error: error.message}};
                    }
                } else return {
                    statusCode: BAD_REQUEST,
                    data: {error: `Method '${request.method}' on route '${request.url}' is not supported.`}
                };
            } else return {statusCode: BAD_REQUEST, data: {error: `Route '${request.url}' is unknown.`}};
        } catch (error)
        {
            return {statusCode: INTERNAL_SERVER_ERROR, data: {error: error.message}};
        }
    }

    private transformEndpoints(endpointDefinitions: Iterable<HttpEndpointDefinition<unknown, unknown>>): { [key: string]: HttpEndpointDefinition<unknown, unknown> }
    {
        const endpoints = {};
        for (const endpointDefinition of endpointDefinitions)
        {
            endpoints[endpointDefinition.route] = endpointDefinition;
        }
        return endpoints;
    }
}
