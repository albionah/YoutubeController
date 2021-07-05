import {TCPSubscriber} from "./TCPSubscriber";
import {expect} from "chai";
import {Message} from "../Message";
import {Subscriber} from "../Subscriber";

describe(TCPSubscriber.name, () => {
    let writtenBuffer: Buffer;
    let subscriber: Subscriber;

    beforeEach(() => writtenBuffer = Buffer.alloc(0));
    beforeEach(() => subscriber = new TCPSubscriber(createSocketMock()));

    describe('when a message is being sent', () => {
        it('should stringify the object to JSON with null terminating character at the end', async () => {
            await subscriber.sendMessage({test: "json"} as any);
            expect(writtenBuffer).to.be.deep.equal(Buffer.from([123, 34, 116, 101, 115, 116, 34, 58, 34, 106, 115, 111, 110, 34, 125, 0]));
        });

        it('should produce JSON parsable string (ignoring null terminating character at the end)', async () => {
            const message: Message = {type: "InitialSyncMessage", data: {test: "json", number: 55, veryLongPropertyKey: "VeryLongPropertyValueVeryLongPropertyValueVeryLongPropertyValueVeryLongPropertyValueVeryLongPropertyValueVeryLongPropertyValueVeryLongPropertyValueVeryLongPropertyValue"}};
            await subscriber.sendMessage(message);
            expect(message).to.be.deep.equal(JSON.parse(writtenBuffer.slice(0, -1).toString()));
        });

        describe('and message contains special characters', () => {
            it('should keep them', async () => {
                const message: Message = {type: "InitialSyncMessage", data: {"title":"Mambo - REMIX 2020 (ěščřžýáíé Эту песню ищут все)"}};
                await subscriber.sendMessage(message);
                expect(message).to.be.deep.equal(JSON.parse(writtenBuffer.slice(0, -1).toString()));
            });
        });
    });

    function createSocketMock(): any
    {
        return {
            write: (message, callback) => {
                writtenBuffer = message;
                callback();
            }
        };
    }
});
