import * as http from 'http';
import {HttpApi} from './Controlling/HTTP/HttpApi';
import {getHttpEndpointDefinitions} from './Controlling/HTTP/httpEndpointDefinitions';
import {ShowYoutubeInstancesExecutor} from './Controlling/Executors/ShowYoutubeInstancesExecutor';
import {YoutubeInstanceIdParser} from './Controlling/HTTP/Parsers/YoutubeInstanceIdParser';
import {PlayExecutor} from './Controlling/Executors/PlayExecutor';
import {PauseExecutor} from './Controlling/Executors/PauseExecutor';
import {YoutubeInstanceWebSocketServer} from './BrowserConnection/YoutubeInstanceWebSocketServer';
import {WatchExecutor} from './Controlling/Executors/WatchExecutor';
import {VideoIdAndYoutubeInstanceParser} from "./Controlling/HTTP/Parsers/VideoIdAndYoutubeInstanceParser";
import {JsonBodyDataGetter} from "./Controlling/HTTP/Parsers/JsonBodyDataGetter";
import {WatchPreviousExecutor} from "./Controlling/Executors/WatchPreviousExecutor";
import {WatchNextExecutor} from "./Controlling/Executors/WatchNextExecutor";
import {config} from "./config";
import {QueryParser} from "./Controlling/HTTP/Parsers/QueryParser";
import {GetAutoCompleteSuggestionsExecutor} from "./Controlling/Executors/GetAutoCompleteSuggestionsExecutor";
import {GetSearchResultsExecutor} from "./Controlling/Executors/GetSearchResultsExecutor";
import {YoutubeInstanceBuilder} from "./Subscribing/YoutubeInstanceBuilder";
import {SubscriberWebSocketServer} from "./Subscribing/WebSocket/SubscriberWebSocketServer";
import {EventProducingYoutubeController} from "./Subscribing/EventProducingYoutubeController";
import {SubscriberManager} from "./Subscribing/SubscriberManager";
import {MessageGenerator} from "./Subscribing/MessageGenerator";
import {YoutubeController} from "./YoutubeController";
import {EventPublisher} from "./Subscribing/EventPublisher";

const youtubeController = new YoutubeController();
const messageGenerator = new MessageGenerator(new ShowYoutubeInstancesExecutor(youtubeController));
const subscriberManager = new SubscriberManager(messageGenerator);
const eventPublisher = new EventPublisher(messageGenerator, subscriberManager);
const eventProducingYoutubeController = new EventProducingYoutubeController(youtubeController, eventPublisher);

const httpApi = new HttpApi(getHttpEndpointDefinitions({
        youtubeInstanceIdParser: new YoutubeInstanceIdParser(),
        videoIdAndYoutubeInstanceParser: new VideoIdAndYoutubeInstanceParser(new JsonBodyDataGetter(config.serverApi.maxUploadTimeInMs)),
        queryParser: new QueryParser()
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
const httpServer = http.createServer(async (request, response) => {
    console.debug("handling request");
    const responseOptions = await httpApi.handle(request);
    console.log(`responding with ${JSON.stringify(responseOptions)}`);
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.statusCode = responseOptions.statusCode;
    response.end(JSON.stringify(responseOptions.data));
});

httpServer.listen(config.serverApi.port);
const youtubeInstanceBuilder = new YoutubeInstanceBuilder(eventPublisher);
new YoutubeInstanceWebSocketServer(eventProducingYoutubeController, youtubeInstanceBuilder, config.browser);
new SubscriberWebSocketServer(config.reportServer, subscriberManager);
