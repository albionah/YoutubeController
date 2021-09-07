import {HttpRequest} from "../HttpRequest";
import {Executor} from "../../Executors/Executor";

export interface ExecutorBuilder<RESULT_DATA>
{
    build(request: HttpRequest): Promise<Executor<RESULT_DATA>>;
}
