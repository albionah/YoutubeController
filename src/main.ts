import * as http from 'http';
import {HttpApi} from './Controlling/HTTP/HttpApi';
import {
    getHttpEndpointDefinitionsForControlling,
    getHttpEndpointDefinitionsForSearchingVideos
} from './Controlling/HTTP/httpEndpointDefinitions';
import {ShowYoutubeInstancesExecutor} from './Controlling/Executors/ShowYoutubeInstancesExecutor';
import {YoutubeInstanceWebSocketServer} from './BrowserConnection/YoutubeInstanceWebSocketServer';
import {JsonBodyDataGetter} from "./Controlling/HTTP/Parsers/JsonBodyDataGetter";
import {config} from "./config";
import {EventProducingYoutubeInstanceBuilder} from "./Subscribing/EventProducingYoutubeInstanceBuilder";
import {SubscriberWebSocketServer} from "./Subscribing/WebSocket/SubscriberWebSocketServer";
import {EventProducingYoutubeController} from "./Subscribing/EventProducingYoutubeController";
import {SubscribersManager} from "./Subscribing/SubscribersManager";
import {MessageCreator} from "./Subscribing/MessageCreator";
import {YoutubeController} from "./YoutubeController";
import {EventPublisher} from "./Subscribing/EventPublisher";
import {SubscriberTCPServer} from "./Subscribing/TCP/SubscriberTCPServer";
import {HttpRequestBuilder} from "./Controlling/HTTP/HttpRequestBuilder";
import {GeneralExecutorBuilder} from "./Controlling/HTTP/ExecutorBuilders/GeneralExecutorBuilder";

const youtubeController = new YoutubeController();
const messageCreator = new MessageCreator(new ShowYoutubeInstancesExecutor(youtubeController));
const subscriberManager = new SubscribersManager(messageCreator);
const eventPublisher = new EventPublisher(messageCreator);
const eventProducingYoutubeController = new EventProducingYoutubeController(youtubeController, eventPublisher);
const jsonBodyDataGetter = new JsonBodyDataGetter(config.controllingApi.maxUploadTimeInMs);
const httpRequestBuilder = new HttpRequestBuilder(jsonBodyDataGetter);

const generalExecutorBuilder = new GeneralExecutorBuilder([
    ...getHttpEndpointDefinitionsForControlling(youtubeController),
    ...getHttpEndpointDefinitionsForSearchingVideos()
]);
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

eventPublisher.getMessages().subscribe({next: (message) => subscriberManager.publishMessage(message)});
