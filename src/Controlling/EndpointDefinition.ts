import {Executor} from './Executors/Executor';

export interface EndpointDefinition<OPTIONS, RESULT_DATA>
{
    executor: Executor<OPTIONS, RESULT_DATA>;
}
