import {Parser} from "./Parser";
import {HttpRequest} from "../HttpRequest";
import {MissingParameterInBodyData} from "./Errors/MissingParameterInBodyData";

export class CommandParser implements Parser<{ command: string }>
{
    public async parse(request: HttpRequest): Promise<{ command: string }>
    {
        const command = request.body?.command;
        if (!command)
        {
            throw new MissingParameterInBodyData("command");
        }
        return {command: request.body?.command};
    }
}

