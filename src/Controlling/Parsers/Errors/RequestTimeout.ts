export class RequestTimeout extends Error {
    public constructor(maxUploadTimeInMs: number) {
        super(`Client has ${maxUploadTimeInMs} ms to upload data. It took longer than that limit.`);
        this.name = "RequestTimeout";
    }
}
