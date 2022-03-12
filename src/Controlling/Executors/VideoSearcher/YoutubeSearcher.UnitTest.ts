import {expect} from "chai";
import {YoutubeSearcher} from "./YoutubeSearcher";

describe(YoutubeSearcher.name, () => {
    describe('when search for rammstein du hast', () => {
        it.skip('should return results regarding du hast song', async () => {
            const youtubeSearcher = new YoutubeSearcher();
            expect((await youtubeSearcher.search("rammstein du hast")).slice(0, 5).map((song) => ({title: song.title}))).to.be.deep.equal([
                    {
                        "title": "Rammstein - Du Hast (Official Video)"
                    },
                    {
                        "title": "Rammstein: Paris - Du Hast (Official Video)"
                    },
                    {
                        "title": "Rammstein - Deutschland (Official Video)"
                    },
                    {
                        "title": "Rammstein: Du Hast - Live Paris (Perfect Rock) : Reaction"
                    },
                    {
                        "title": "Rammstein - Du hast (Live in Russia Trailer, Multicam By Vinz)"
                    }
                ]
            );
        });
    });
});
