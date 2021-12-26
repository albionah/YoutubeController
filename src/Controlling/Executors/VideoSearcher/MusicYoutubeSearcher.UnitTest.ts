import {expect} from "chai";
import {MusicYoutubeSearcher} from "./MusicYoutubeSearcher";

describe(MusicYoutubeSearcher.name, () => {
    it('should ', async () => {
        const musicYoutubeSearcher = new MusicYoutubeSearcher();
        expect(await musicYoutubeSearcher.search("rammstein du hast (Official Video)")).to.be.deep.equal([]);
    });
});
