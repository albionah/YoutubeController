export class UnknownMethod extends Error
{
    public constructor(method: string)
    {
        super(`Method '${method}' in unknown`);
        this.name = UnknownMethod.name;
    }
}
