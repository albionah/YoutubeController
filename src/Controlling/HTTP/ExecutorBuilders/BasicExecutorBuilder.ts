import {HttpRequest} from "../HttpRequest";
import {Executor} from "../../Executors/Executor";
import {Parser} from "../Parsers/Parser";
import {YoutubeInstanceAccessor} from "../../../DataTypes/YoutubeInstanceAccessor";
import {ExecutorBuilder} from "./ExecutorBuilder";

export interface BasicExecutorConstructor<OPTIONS, RESULT_DATA> {
    new (youtubeManager: YoutubeInstanceAccessor, parameters: OPTIONS): Executor<RESULT_DATA>;
}

export class BasicExecutorBuilder<OPTIONS, RESULT_DATA> implements ExecutorBuilder<RESULT_DATA>
{
    private readonly executorConstructor: BasicExecutorConstructor<OPTIONS, RESULT_DATA>;
    private readonly youtubeManager: YoutubeInstanceAccessor;
    private readonly parser?: Parser<OPTIONS>;

    public constructor(executorConstructor: BasicExecutorConstructor<OPTIONS, RESULT_DATA>, youtubeManager: YoutubeInstanceAccessor, parser?: Parser<OPTIONS>)
    {
        this.executorConstructor = executorConstructor;
        this.youtubeManager = youtubeManager;
        this.parser = parser;
    }

    public async build(request: HttpRequest): Promise<Executor<RESULT_DATA>>
    {
        const parameters = await this.parser?.parse(request);
        return new this.executorConstructor(this.youtubeManager, parameters);
    }
}
