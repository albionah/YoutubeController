export class UnknownCommand extends Error
{
    public constructor(command: string)
    {
        super(`Command '${command}' is unknown`);
        this.name = UnknownCommand.name;
    }
}
