import {HttpRequest} from "../HttpRequest";
import {Executor} from "../../Executors/Executor";
import {PlayExecutor} from "../../Executors/PlayExecutor";
import {YoutubeInstanceAccessor} from "../../../DataTypes/YoutubeInstanceAccessor";
import {Parser} from "../Parsers/Parser";
import {YoutubeInstanceId} from "../../../DataTypes/YoutubeInstanceId";
import {ExecutorBuilder} from "./ExecutorBuilder";

export class PlayExecutorBuilder implements ExecutorBuilder<void>
{
    public constructor(private readonly youtubeManager: YoutubeInstanceAccessor, private readonly parser: Parser<{youtubeInstanceId: YoutubeInstanceId}>) {}

    public async build(request: HttpRequest): Promise<Executor<any>>
    {
        return new PlayExecutor(this.youtubeManager, await this.parser.parse(request));
    }
}
