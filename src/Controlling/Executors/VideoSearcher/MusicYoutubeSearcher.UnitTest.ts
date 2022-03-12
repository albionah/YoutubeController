import {expect} from "chai";
import {MusicYoutubeSearcher} from "./MusicYoutubeSearcher";

describe(MusicYoutubeSearcher.name, () => {
    describe('when search for rammstein du hast', () => {
        it.skip('should return results regarding du hast song', async () => {
            const musicYoutubeSearcher = new MusicYoutubeSearcher();
            expect(await musicYoutubeSearcher.search("rammstein du hast (Official Video)")).to.be.deep.equal([]);
        });
    });
});
