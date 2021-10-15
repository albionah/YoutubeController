import {HttpMethod} from './HttpMethod';
import {ShowYoutubeInstancesExecutor} from '../Executors/ShowYoutubeInstancesExecutor';
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
import {YoutubeInstanceIdParser} from "./Parsers/YoutubeInstanceIdParser";
import {VideoIdParser} from "./Parsers/VideoIdParser";
import {QueryParser} from "./Parsers/QueryParser";
import {MultiParser} from "./Parsers/MultiParser";
import {CommandParser} from "./Parsers/CommandParser";

const youtubeInstanceIdParser = new YoutubeInstanceIdParser();
const queryParser = new QueryParser();
const videoIdParser = new VideoIdParser();
const commandParser = new CommandParser()
const videoIdAndYoutubeInstanceParser = new MultiParser(youtubeInstanceIdParser, videoIdParser);

export function getHttpEndpointDefinitionsForControlling(youtubeManager: YoutubeInstanceAccessor): ReadonlyArray<HttpEndpointDefinition<any, any>>
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
            executorBuilder: new CommandExecutorBuilder(commandParser, getCommandExecutorBuilders(youtubeManager)),
        }
    ];
}

export function getHttpEndpointDefinitionsForSearchingVideos(): ReadonlyArray<HttpEndpointDefinition<any, any>>
{
    return [
        {
            method: HttpMethod.GET,
            route: '/auto-complete-suggestions',
            executorBuilder: new BasicExecutorBuilder(GetAutoCompleteSuggestionsExecutor, queryParser)
        },
        {
            method: HttpMethod.GET,
            route: '/search-results',
            executorBuilder: new BasicExecutorBuilder(GetSearchResultsExecutor, queryParser)
        }
    ];
}

function getCommandExecutorBuilders(youtubeManager: YoutubeInstanceAccessor): Record<string, ExecutorBuilder<void>> {
    return {
        play: new YoutubeManagerExecutorBuilder(PlayExecutor, youtubeManager, youtubeInstanceIdParser),
        pause: new YoutubeManagerExecutorBuilder(PauseExecutor, youtubeManager, youtubeInstanceIdParser),
        watch: new YoutubeManagerExecutorBuilder(WatchExecutor, youtubeManager, videoIdAndYoutubeInstanceParser),
        "watch-next": new YoutubeManagerExecutorBuilder(WatchNextExecutor, youtubeManager, youtubeInstanceIdParser),
        "watch-previous": new YoutubeManagerExecutorBuilder(WatchPreviousExecutor, youtubeManager, youtubeInstanceIdParser)
    }
}
