export const config = {
    browserConnection: {port: 7789},
    controllingApi: {port: 7790, maxUploadTimeInMs: 1000},
    subscribing: {
        websocket: {port: 7791},
        tcp: {port: 7792}
    }
};
