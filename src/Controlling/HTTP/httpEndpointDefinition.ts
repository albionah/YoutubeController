import {HttpMethod} from "./HttpMethod";
import {ExecutorBuilder} from "./ExecutorBuilders/ExecutorBuilder";

export interface HttpEndpointDefinition<OPTIONS, RESULT_DATA>
{
    method: HttpMethod;
    route: string;
    executorBuilder: ExecutorBuilder<RESULT_DATA>,
}
