import {HttpMethod} from './HttpMethod';
import {ShowYoutubeInstancesExecutor} from '../Executors/ShowYoutubeInstancesExecutor';
import {EndpointDefinition} from '../EndpointDefinition';
import {Parser} from '../Parsers/Parser';
import {Executor} from '../Executors/Executor';
import {PlayExecutor} from '../Executors/PlayExecutor';
import {PauseExecutor} from '../Executors/PauseExecutor';
import {YoutubeInstanceIdParser} from '../Parsers/YoutubeInstanceIdParser';
import {WatchExecutor} from '../Executors/WatchExecutor';
import {VideoIdAndYoutubeInstanceParser} from "../Parsers/VideoIdAndYoutubeInstanceParser";
import {WatchNextExecutor} from "../Executors/WatchNextExecutor";
import {WatchPreviousExecutor} from "../Executors/WatchPreviousExecutor";

export interface HttpEndpointDefinition<OPTIONS, RESULT_DATA> extends EndpointDefinition<OPTIONS, RESULT_DATA>
{
    route: string;
    method: HttpMethod;
    parser?: Parser<OPTIONS>;
}

function use<OPTIONS, RESULT_DATA>(parser: Parser<OPTIONS>, executor: Executor<OPTIONS, RESULT_DATA>): { parser?: Parser<OPTIONS>, executor: Executor<OPTIONS, RESULT_DATA> };
function use<RESULT_DATA>(executor: Executor<undefined, RESULT_DATA>): { executor: Executor<undefined, RESULT_DATA> };

function use<OPTIONS, RESULT_DATA>(...args: any[]): { parser?: Parser<OPTIONS>, executor: Executor<OPTIONS, RESULT_DATA> }
{
    return args.length === 1 ? {executor: args[0]} : {parser: args[0], executor: args[1]};
}

export interface Parsers
{
    youtubeInstanceIdParser: YoutubeInstanceIdParser,
    videoIdAndYoutubeInstanceParser: VideoIdAndYoutubeInstanceParser
}

export interface Executors
{
    showYoutubeInstances: ShowYoutubeInstancesExecutor,
    play: PlayExecutor,
    pause: PauseExecutor,
    watch: WatchExecutor,
    watchNext: WatchNextExecutor,
    watchPrevious: WatchPreviousExecutor
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
        }
    ];
}
