import {HttpMethod} from './HttpMethod';
import {ShowYoutubeInstancesExecutor} from '../Executors/ShowYoutubeInstancesExecutor';
import {Parser} from './Parsers/Parser';
import {VideoId} from "../../DataTypes/VideoId";
import {YoutubeInstanceId} from "../../DataTypes/YoutubeInstanceId";
import {BasicExecutorBuilder} from "./ExecutorBuilders/BasicExecutorBuilder";
import {YoutubeInstanceAccessor} from "../../DataTypes/YoutubeInstanceAccessor";
import {CommandExecutorBuilder} from "./ExecutorBuilders/CommandExecutorBuilder";
import {ExecutorBuilder} from "./ExecutorBuilders/ExecutorBuilder";
import {HttpEndpointDefinition} from "./httpEndpointDefinition";

export interface Parsers
{
    youtubeInstanceIdParser: Parser<{ youtubeInstanceId: YoutubeInstanceId }>,
    videoIdAndYoutubeInstanceParser: Parser<{ videoId: VideoId, youtubeInstanceId: YoutubeInstanceId }>,
    queryParser: Parser<{ query: string }>,
    commandParser: Parser<{ command: string }>
}

export function getHttpEndpointDefinitions(youtubeManager: YoutubeInstanceAccessor, parsers: Parsers, commandExecutorBuilders: Record<string, ExecutorBuilder<void>>): ReadonlyArray<HttpEndpointDefinition<any, any>>
{
    return [
        {
            method: HttpMethod.GET,
            route: '/youtube-instances',
            executorBuilder: new BasicExecutorBuilder(ShowYoutubeInstancesExecutor, youtubeManager)
        },
        {
            method: HttpMethod.POST,
            route: '/youtube-instances/commands',
            executorBuilder: new CommandExecutorBuilder(parsers.commandParser, commandExecutorBuilders),
        },
    ];
}
