import {HttpRequest} from "../../HttpRequest";

export class UnknownRoute extends Error
{
    public constructor(request: HttpRequest)
    {
        super(`Route '${request.url}' is unknown.`);
        this.name = UnknownRoute.name;
    }
}
