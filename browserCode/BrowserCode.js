// ==UserScript==
// @name     Youtube controller
// @version  1
// @grant    unsafeWindow
// ==/UserScript==

const video = document.querySelector("video");
const player = unsafeWindow.document.getElementById("movie_player");
let connection;

function getMediaInfo() {
    console.debug("getting media info");
    return new Promise((resolve) => {
        const h1s = document.getElementsByTagName("h1");
        if (h1s[0] && h1s[0].textContent.replace(/^[ \n]+/i, '')) {
            const stats = player.getVideoStats();
            resolve({
                title: h1s[0].textContent,
                videoId: stats.docid,
                duration: stats.len,
                currentPosition: stats.lct,
                isPlaying: stats.vpa !== "1"
            });
        } else {
            setTimeout(() => getMediaInfo().then((mediaInfo) => resolve(mediaInfo)), 100);
        }
    });
}

function uploadBasicInfo() {
    getMediaInfo().then((mediaInfo) => {
        console.debug("media info", mediaInfo);
        connection?.send(JSON.stringify(mediaInfo));
    });
}

function uploadVolumeInfo() {
    console.log(JSON.stringify(player.getVideoStats()));
    const info = {volume: player.getVideoStats().volume};
    console.log(info);
    connection?.send(JSON.stringify(info));
}

video.addEventListener("canplaythrough", () => {
    console.log("event canplaythrough");
    uploadBasicInfo();
});
video.addEventListener("play", () => {
    console.log("event play");
    uploadBasicInfo();
});
video.addEventListener("pause", () => {
    console.log("event pause");
    uploadBasicInfo();
});
// video.addEventListener("volumechange", () => {
//     console.log("volumechange");
//     uploadVolumeInfo();
// });

function connect() {
    const websocket = new WebSocket("ws://localhost:7789");

    websocket.onopen = () => {
        console.debug("connected to Youtube controller");
        connection = websocket;
        uploadBasicInfo();
    }
    websocket.onmessage = (rawMessage) => {
        try {
            console.log(rawMessage.data);
            const message = JSON.parse(rawMessage.data);
            switch (message.type) {
                case "playOrPause":
                    var evt = new KeyboardEvent('keydown', {'keyCode': 75, 'which': 75});
                    document.dispatchEvent(evt);
                    break;

                case "play":
                    video.play();
                    break;

                case "pause":
                    video.pause();
                    break;

                case "stop":
                    video.stop();
                    break;

                case "watchPrevious":
                    player.previousVideo();
                    break;

                case "watchNext":
                    player.nextVideo();
                    break;

                case "watch":
                    console.log(message.id);
                    player.cueVideoById(message.id);
                    // location.href = message.id;
                    break;
            }
        } catch (error) {
            console.error(error);
        }
    }

    websocket.onclose = (e) => {
        console.info('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
        connection = undefined;
        setTimeout(connect, 3000);
    };

    websocket.onerror = (err) => {
        console.error('Socket encountered error: ', err.message, 'Closing socket');
        websocket.close();
    };
}
connect();
