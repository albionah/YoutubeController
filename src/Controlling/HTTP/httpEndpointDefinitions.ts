import {HttpMethod} from './HttpMethod';
import {ShowYoutubeInstancesExecutor} from '../Executors/ShowYoutubeInstancesExecutor';
import {EndpointDefinition} from '../EndpointDefinition';
import {Parser} from './Parsers/Parser';
import {PlayExecutor} from '../Executors/PlayExecutor';
import {PauseExecutor} from '../Executors/PauseExecutor';
import {WatchExecutor} from '../Executors/WatchExecutor';
import {WatchNextExecutor} from "../Executors/WatchNextExecutor";
import {WatchPreviousExecutor} from "../Executors/WatchPreviousExecutor";
import {GetAutoCompleteSuggestionsExecutor} from "../Executors/GetAutoCompleteSuggestionsExecutor";
import {GetSearchResultsExecutor} from "../Executors/GetSearchResultsExecutor";
import {VideoId} from "../../DataTypes/VideoId";
import {YoutubeInstanceId} from "../../DataTypes/YoutubeInstanceId";

export interface HttpEndpointDefinition<OPTIONS, RESULT_DATA> extends EndpointDefinition<OPTIONS, RESULT_DATA>
{
    route: string;
    method: HttpMethod;
    parser?: Parser<OPTIONS>;
}

export interface Parsers
{
    youtubeInstanceIdParser: Parser<{ id: YoutubeInstanceId }>,
    videoIdAndYoutubeInstanceParser: Parser<{ videoId: VideoId, youtubeInstanceId: YoutubeInstanceId }>,
    queryParser: Parser<{ query: string }>
}

export interface Executors
{
    showYoutubeInstances: ShowYoutubeInstancesExecutor,
    play: PlayExecutor,
    pause: PauseExecutor,
    watch: WatchExecutor,
    watchNext: WatchNextExecutor,
    watchPrevious: WatchPreviousExecutor,
    getAutoCompleteSuggestions: GetAutoCompleteSuggestionsExecutor,
    getSearchResults: GetSearchResultsExecutor
}

export function getHttpEndpointDefinitions(parsers: Parsers, executors: Executors): ReadonlyArray<HttpEndpointDefinition<unknown, unknown>>
{
    return [
        {
            route: '/show-youtube-instances',
            method: HttpMethod.GET,
            executor: executors.showYoutubeInstances
        },
        {
            route: '/play',
            method: HttpMethod.POST,
            parser: parsers.youtubeInstanceIdParser,
            executor: executors.play
        },
        {
            route: '/pause',
            method: HttpMethod.POST,
            parser: parsers.youtubeInstanceIdParser,
            executor: executors.pause
        },
        {
            route: '/watch',
            method: HttpMethod.POST,
            parser: parsers.videoIdAndYoutubeInstanceParser,
            executor: executors.watch
        },
        {
            route: '/watch-next',
            method: HttpMethod.POST,
            parser: parsers.youtubeInstanceIdParser,
            executor: executors.watchNext
        },
        {
            route: '/watch-previous',
            method: HttpMethod.POST,
            parser: parsers.youtubeInstanceIdParser,
            executor: executors.watchPrevious
        },
        {
            route: '/auto-complete-suggestions',
            method: HttpMethod.GET,
            parser: parsers.queryParser,
            executor: executors.getAutoCompleteSuggestions
        },
        {
            route: '/search-results',
            method: HttpMethod.GET,
            parser: parsers.queryParser,
            executor: executors.getSearchResults
        }
    ];
}
