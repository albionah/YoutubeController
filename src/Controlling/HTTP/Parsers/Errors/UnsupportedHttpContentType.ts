export class UnsupportedHttpContentType extends Error {
    public constructor(contentType?: string) {
        super(`HTTP content type '${contentType}' is not allowed. Only 'application/json' is supported.`);
        this.name = UnsupportedHttpContentType.name;
    }
}
