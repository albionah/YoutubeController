export class MissingParameterInBodyData extends Error {
    public constructor(parameterName: string) {
        super(`Missing '${parameterName}' in body data.`);
        this.name = MissingParameterInBodyData.name;
    }
}
