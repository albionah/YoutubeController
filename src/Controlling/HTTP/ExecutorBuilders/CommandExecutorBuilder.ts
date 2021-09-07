import {HttpRequest} from "../HttpRequest";
import {Executor} from "../../Executors/Executor";
import {Parser} from "../Parsers/Parser";
import {ExecutorBuilder} from "./ExecutorBuilder";
import {UnknownCommand} from "./Errors/UnknownCommand";

export class CommandExecutorBuilder implements ExecutorBuilder<void>
{
    private readonly commandParser: Parser<{command: string}>;
    private readonly commandExecutorBuilders: Record<string, ExecutorBuilder<void>>;

    public constructor(commandParser: Parser<{command: string}>, commandExecutorBuilders: Record<string, ExecutorBuilder<void>>)
    {
        this.commandExecutorBuilders = commandExecutorBuilders;
        this.commandParser = commandParser;
    }

    public async build(request: HttpRequest): Promise<Executor<void>>
    {
        const parameters = await this.commandParser.parse(request);
        const executorBuilder: ExecutorBuilder<void> = this.commandExecutorBuilders[parameters.command];
        if (!executorBuilder) {
            throw new UnknownCommand(parameters.command);
        }
        return executorBuilder.build(request);
    }
}
