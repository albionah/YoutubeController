export class EmptyParameter extends Error {
    public constructor(parameterName: string) {
        super(`Parameter '${parameterName}' cannot be empty.`);
        this.name = EmptyParameter.name;
    }
}
