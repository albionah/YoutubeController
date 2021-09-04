import * as http from 'http';
import {HttpApi} from './Controlling/HTTP/HttpApi';
import {getHttpEndpointDefinitions} from './Controlling/HTTP/httpEndpointDefinitions';
import {ShowYoutubeInstancesExecutor} from './Controlling/Executors/ShowYoutubeInstancesExecutor';
import {YoutubeInstanceIdParser} from './Controlling/HTTP/Parsers/YoutubeInstanceIdParser';
import {PlayExecutor} from './Controlling/Executors/PlayExecutor';
import {PauseExecutor} from './Controlling/Executors/PauseExecutor';
import {YoutubeInstanceWebSocketServer} from './BrowserConnection/YoutubeInstanceWebSocketServer';
import {WatchExecutor} from './Controlling/Executors/WatchExecutor';
import {VideoIdParser} from "./Controlling/HTTP/Parsers/VideoIdParser";
import {JsonBodyDataGetter} from "./Controlling/HTTP/Parsers/JsonBodyDataGetter";
import {WatchPreviousExecutor} from "./Controlling/Executors/WatchPreviousExecutor";
import {WatchNextExecutor} from "./Controlling/Executors/WatchNextExecutor";
import {config} from "./config";
import {QueryParser} from "./Controlling/HTTP/Parsers/QueryParser";
import {GetAutoCompleteSuggestionsExecutor} from "./Controlling/Executors/GetAutoCompleteSuggestionsExecutor";
import {GetSearchResultsExecutor} from "./Controlling/Executors/GetSearchResultsExecutor";
import {EventProducingYoutubeInstanceBuilder} from "./Subscribing/EventProducingYoutubeInstanceBuilder";
import {SubscriberWebSocketServer} from "./Subscribing/WebSocket/SubscriberWebSocketServer";
import {EventProducingYoutubeController} from "./Subscribing/EventProducingYoutubeController";
import {SubscribersManager} from "./Subscribing/SubscribersManager";
import {MessageCreator} from "./Subscribing/MessageCreator";
import {YoutubeController} from "./YoutubeController";
import {EventPublisher} from "./Subscribing/EventPublisher";
import {SubscriberTCPServer} from "./Subscribing/TCP/SubscriberTCPServer";
import {MultiParser} from "./Controlling/HTTP/Parsers/MultiParser";
import {HttpRequestBuilder} from "./httpRequestBuilder";

const youtubeController = new YoutubeController();
const messageCreator = new MessageCreator(new ShowYoutubeInstancesExecutor(youtubeController));
const subscriberManager = new SubscribersManager(messageCreator);
const eventPublisher = new EventPublisher(messageCreator, subscriberManager);
const eventProducingYoutubeController = new EventProducingYoutubeController(youtubeController, eventPublisher);
const jsonBodyDataGetter = new JsonBodyDataGetter(config.controllingApi.maxUploadTimeInMs);
const httpRequestBuilder = new HttpRequestBuilder(jsonBodyDataGetter);
const youtubeInstanceIdParser = new YoutubeInstanceIdParser();
const videoIdParser = new VideoIdParser();
const queryParser = new QueryParser();

const httpApi = new HttpApi(getHttpEndpointDefinitions({
        youtubeInstanceIdParser: youtubeInstanceIdParser,
        queryParser: queryParser,
        videoIdAndYoutubeInstanceParser: new MultiParser(youtubeInstanceIdParser, videoIdParser)
    },
    {
        showYoutubeInstances: new ShowYoutubeInstancesExecutor(youtubeController),
        play: new PlayExecutor(youtubeController),
        pause: new PauseExecutor(youtubeController),
        watch: new WatchExecutor(youtubeController),
        watchNext: new WatchNextExecutor(youtubeController),
        watchPrevious: new WatchPreviousExecutor(youtubeController),
        getAutoCompleteSuggestions: new GetAutoCompleteSuggestionsExecutor(),
        getSearchResults: new GetSearchResultsExecutor()
    }));
const httpServer = http.createServer(async (message, response) => {
    console.debug("handling request");
    const request = await httpRequestBuilder.build(message);
    console.debug(request);
    const responseOptions = await httpApi.handle(request);
    console.debug(`responding with ${JSON.stringify(responseOptions)}`);
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.statusCode = responseOptions.statusCode;
    response.end(JSON.stringify(responseOptions.data));
});

httpServer.listen(config.controllingApi.port);
const youtubeInstanceBuilder = new EventProducingYoutubeInstanceBuilder(eventPublisher);
new YoutubeInstanceWebSocketServer(eventProducingYoutubeController, youtubeInstanceBuilder, config.browserConnection);
new SubscriberWebSocketServer(config.subscribing.websocket, subscriberManager);
new SubscriberTCPServer(config.subscribing.tcp, subscriberManager);
