import * as http from 'http';
import {HttpApi} from './Controlling/HTTP/HttpApi';
import {getHttpEndpointDefinitions} from './Controlling/HTTP/httpEndpointDefinitions';
import {ShowYoutubeInstancesExecutor} from './Controlling/Executors/ShowYoutubeInstancesExecutor';
import {YoutubeInstanceIdParser} from './Controlling/HTTP/Parsers/YoutubeInstanceIdParser';
import {YoutubeInstanceWebSocketServer} from './BrowserConnection/YoutubeInstanceWebSocketServer';
import {VideoIdParser} from "./Controlling/HTTP/Parsers/VideoIdParser";
import {JsonBodyDataGetter} from "./Controlling/HTTP/Parsers/JsonBodyDataGetter";
import {config} from "./config";
import {QueryParser} from "./Controlling/HTTP/Parsers/QueryParser";
import {EventProducingYoutubeInstanceBuilder} from "./Subscribing/EventProducingYoutubeInstanceBuilder";
import {SubscriberWebSocketServer} from "./Subscribing/WebSocket/SubscriberWebSocketServer";
import {EventProducingYoutubeController} from "./Subscribing/EventProducingYoutubeController";
import {SubscribersManager} from "./Subscribing/SubscribersManager";
import {MessageCreator} from "./Subscribing/MessageCreator";
import {YoutubeController} from "./YoutubeController";
import {EventPublisher} from "./Subscribing/EventPublisher";
import {SubscriberTCPServer} from "./Subscribing/TCP/SubscriberTCPServer";
import {HttpRequestBuilder} from "./Controlling/HTTP/HttpRequestBuilder";
import {MultiParser} from "./Controlling/HTTP/Parsers/MultiParser";
import {BasicExecutorBuilder} from "./Controlling/HTTP/ExecutorBuilders/BasicExecutorBuilder";
import {PlayExecutor} from "./Controlling/Executors/PlayExecutor";
import {PauseExecutor} from "./Controlling/Executors/PauseExecutor";
import {WatchExecutor} from "./Controlling/Executors/WatchExecutor";
import {WatchNextExecutor} from "./Controlling/Executors/WatchNextExecutor";
import {WatchPreviousExecutor} from "./Controlling/Executors/WatchPreviousExecutor";
import {CommandParser} from "./Controlling/HTTP/Parsers/CommandParser";
import {GeneralExecutorBuilder} from "./Controlling/HTTP/ExecutorBuilders/GeneralExecutorBuilder";

const youtubeController = new YoutubeController();
const messageCreator = new MessageCreator(new ShowYoutubeInstancesExecutor(youtubeController));
const subscriberManager = new SubscribersManager(messageCreator);
const eventPublisher = new EventPublisher(messageCreator, subscriberManager);
const eventProducingYoutubeController = new EventProducingYoutubeController(youtubeController, eventPublisher);
const jsonBodyDataGetter = new JsonBodyDataGetter(config.controllingApi.maxUploadTimeInMs);
const httpRequestBuilder = new HttpRequestBuilder(jsonBodyDataGetter);
const youtubeInstanceIdParser = new YoutubeInstanceIdParser();
const videoIdParser = new VideoIdParser();
const parsers = {
    youtubeInstanceIdParser: youtubeInstanceIdParser,
    queryParser: new QueryParser(),
    videoIdAndYoutubeInstanceParser: new MultiParser(youtubeInstanceIdParser, videoIdParser),
    commandParser: new CommandParser()
};
const commandExecutorBuilders = {
    play: new BasicExecutorBuilder(PlayExecutor, youtubeController, parsers.youtubeInstanceIdParser),
    pause: new BasicExecutorBuilder(PauseExecutor, youtubeController, parsers.youtubeInstanceIdParser),
    watch: new BasicExecutorBuilder(WatchExecutor, youtubeController, parsers.videoIdAndYoutubeInstanceParser),
    "watch-next": new BasicExecutorBuilder(WatchNextExecutor, youtubeController, parsers.youtubeInstanceIdParser),
    "watch-previous": new BasicExecutorBuilder(WatchPreviousExecutor, youtubeController, parsers.youtubeInstanceIdParser),
};
const generalExecutorBuilder = new GeneralExecutorBuilder(getHttpEndpointDefinitions(youtubeController, parsers, commandExecutorBuilders));
const httpApi = new HttpApi(httpRequestBuilder, generalExecutorBuilder);

const httpServer = http.createServer(async (message, response) => {
    const responseOptions = await httpApi.handle(message);
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
