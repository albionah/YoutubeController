import {ExecutorBuilder} from "./ExecutorBuilder";
import {HttpRequest} from "../HttpRequest";
import {Executor} from "../../Executors/Executor";
import {Url} from "../../../Utils/Url";
import {UnsupportedMethod} from "./Errors/UnsupportedMethod";
import {UnknownRoute} from "./Errors/UnknownRoute";
import {HttpEndpointDefinition} from "../httpEndpointDefinition";

export class GeneralExecutorBuilder implements ExecutorBuilder<any>
{
    private readonly endpoints: { [key: string]: HttpEndpointDefinition<unknown, unknown> };

    public constructor(endpointDefinitions: Iterable<HttpEndpointDefinition<unknown, unknown>>)
    {
        this.endpoints = this.transformEndpoints(endpointDefinitions);
    }

    async build(request: HttpRequest): Promise<Executor<any>>
    {
        const matchEndpoint = this.endpoints[new Url(request.url).route];
        if (matchEndpoint)
        {
            if (request.method === matchEndpoint.method)
            {
                return matchEndpoint.executorBuilder.build(request);
            } else throw new UnsupportedMethod(request);
        } else throw new UnknownRoute(request);
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
