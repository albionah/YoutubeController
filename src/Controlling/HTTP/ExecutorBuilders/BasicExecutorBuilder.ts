import {ExecutorBuilder} from "./ExecutorBuilder";
import {Parser} from "../Parsers/Parser";
import {HttpRequest} from "../HttpRequest";
import {Executor} from "../../Executors/Executor";

export interface BasicExecutorConstructor<OPTIONS, RESULT_DATA> {
    new (parameters: OPTIONS): Executor<RESULT_DATA>;
}

export class BasicExecutorBuilder<OPTIONS, RESULT_DATA> implements ExecutorBuilder<RESULT_DATA>
{
    private readonly executorConstructor: BasicExecutorConstructor<OPTIONS, RESULT_DATA>;
    private readonly parser?: Parser<OPTIONS>;

    public constructor(executorConstructor: BasicExecutorConstructor<OPTIONS, RESULT_DATA>, parser?: Parser<OPTIONS>)
    {
        this.executorConstructor = executorConstructor;
        this.parser = parser;
    }

    public async build(request: HttpRequest): Promise<Executor<RESULT_DATA>>
    {
        const parameters = await this.parser?.parse(request);
        return new this.executorConstructor(parameters);
    }
}
