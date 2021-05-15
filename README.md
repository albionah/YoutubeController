# YoutubeController
It allows controlling Youtube webpage via API remotely including multiprotocol subscription of events.

## Requirements
You need to inject (this script)[https://github.com/albionah/YoutubeApiExposer] into your browser. After that, you need to run this application. Both the browser and this application need to run on the same computer because of CORS limitation, or you can forward websocket connection (coming from browser) to another computer.

## It supports
- list all youtube instances in your browser(s),
- play,
- pause,
- watch specified video by its ID,
- watch previous video,
- watch following video,
- subscribing events.

## Controlling
Only protocol HTTP is supported by now. 

## Subscribing events
To make the controlling almost realtime, every change in the browser like video was paused etc. generate a JSON event which is published via subscribing streams.
Note: video progress does not produce events. It could be assumed that not paused video increases its progress.
Events can be subscribed via
- websocket,
- TCP (every message is stringified JSON terminated by binary 0 (null terminated string)).

### Event types
There are 4 types
- InitialSyncMessage - once the connection is established you receive this message inform about all youtube instances
- YoutubeInstanceAdded - once the user open new tab in browser with youtube
- YoutubeInstanceRemoved - once the user close the youtube tab
- YoutubeInstanceChanged - once video is paused, played or switched to another video

## Installation and start
First, you need nodeJS. Then clone the repository, go in and run
```
npm install
```
You can launch the application for developing by running
```
npm run start-dev
```
or for production by running
```
npm install -g rimraf
npm run deploy
npm run start-production
```

