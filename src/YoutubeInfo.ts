const yts = require('yt-search')

var readline = require('readline');
var user = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

user.question('Zadej název písničky: ', async (name) => {
    console.log((await searchYoutube(name)).slice(0, 1));
});


async function searchYoutube(name): Promise<any>
{
    const searchResult = await yts(name);
    searchResult.videos.forEach(function (video) {
        console.log(`${video.views} | ${video.title} (${video.timestamp}) | ${video.author.name}`)
    });
}

