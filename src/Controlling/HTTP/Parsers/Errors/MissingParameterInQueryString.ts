export class MissingParameterInQueryString extends Error {
    public constructor(parameterName: string) {
        super(`Missing '${parameterName}' in query string.`);
        this.name = MissingParameterInQueryString.name;
    }
}
