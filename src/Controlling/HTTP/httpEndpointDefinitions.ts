import {HttpMethod} from './HttpMethod';
import {ShowYoutubeInstancesExecutor} from '../Executors/ShowYoutubeInstancesExecutor';
import {Parser} from './Parsers/Parser';
import {VideoId} from "../../DataTypes/VideoId";
import {YoutubeInstanceId} from "../../DataTypes/YoutubeInstanceId";
import {YoutubeManagerExecutorBuilder} from "./ExecutorBuilders/YoutubeManagerExecutorBuilder";
import {YoutubeInstanceAccessor} from "../../DataTypes/YoutubeInstanceAccessor";
import {CommandExecutorBuilder} from "./ExecutorBuilders/CommandExecutorBuilder";
import {ExecutorBuilder} from "./ExecutorBuilders/ExecutorBuilder";
import {HttpEndpointDefinition} from "./httpEndpointDefinition";
import {GetAutoCompleteSuggestionsExecutor} from "../Executors/GetAutoCompleteSuggestionsExecutor";
import {GetSearchResultsExecutor} from "../Executors/GetSearchResultsExecutor";
import {BasicExecutorBuilder} from "./ExecutorBuilders/BasicExecutorBuilder";
import {PlayExecutor} from "../Executors/PlayExecutor";
import {PauseExecutor} from "../Executors/PauseExecutor";
import {WatchExecutor} from "../Executors/WatchExecutor";
import {WatchNextExecutor} from "../Executors/WatchNextExecutor";
import {WatchPreviousExecutor} from "../Executors/WatchPreviousExecutor";

export interface Parsers
{
    youtubeInstanceIdParser: Parser<{ youtubeInstanceId: YoutubeInstanceId }>,
    videoIdAndYoutubeInstanceParser: Parser<{ videoId: VideoId, youtubeInstanceId: YoutubeInstanceId }>,
    queryParser: Parser<{ query: string }>,
    commandParser: Parser<{ command: string }>
}

export function getHttpEndpointDefinitionsForControlling(youtubeManager: YoutubeInstanceAccessor, parsers: Parsers): ReadonlyArray<HttpEndpointDefinition<any, any>>
{
    return [
        {
            method: HttpMethod.GET,
            route: '/youtube-instances',
            executorBuilder: new YoutubeManagerExecutorBuilder(ShowYoutubeInstancesExecutor, youtubeManager)
        },
        {
            method: HttpMethod.POST,
            route: '/youtube-instances/commands',
            executorBuilder: new CommandExecutorBuilder(parsers.commandParser, getCommandExecutorBuilders(youtubeManager, parsers)),
        }
    ];
}

export function getHttpEndpointDefinitionsForBrowsingVideos(parsers: Parsers): ReadonlyArray<HttpEndpointDefinition<any, any>>
{
    return [
        {
            method: HttpMethod.GET,
            route: '/auto-complete-suggestions',
            executorBuilder: new BasicExecutorBuilder(GetAutoCompleteSuggestionsExecutor, parsers.queryParser)
        },
        {
            method: HttpMethod.GET,
            route: '/search-results',
            executorBuilder: new BasicExecutorBuilder(GetSearchResultsExecutor, parsers.queryParser)
        }
    ];
}

function getCommandExecutorBuilders(youtubeManager: YoutubeInstanceAccessor, parsers: Parsers): Record<string, ExecutorBuilder<void>> {
    return {
        play: new YoutubeManagerExecutorBuilder(PlayExecutor, youtubeManager, parsers.youtubeInstanceIdParser),
        pause: new YoutubeManagerExecutorBuilder(PauseExecutor, youtubeManager, parsers.youtubeInstanceIdParser),
        watch: new YoutubeManagerExecutorBuilder(WatchExecutor, youtubeManager, parsers.videoIdAndYoutubeInstanceParser),
        "watch-next": new YoutubeManagerExecutorBuilder(WatchNextExecutor, youtubeManager, parsers.youtubeInstanceIdParser),
        "watch-previous": new YoutubeManagerExecutorBuilder(WatchPreviousExecutor, youtubeManager, parsers.youtubeInstanceIdParser)
    }
}
