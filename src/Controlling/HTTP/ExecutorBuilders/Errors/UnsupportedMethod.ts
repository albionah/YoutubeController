import {HttpRequest} from "../../HttpRequest";

export class UnsupportedMethod extends Error
{
    public constructor(request: HttpRequest)
    {
        super(`Method '${request.method}' on route '${request.url}' is not supported.`);
        this.name = UnsupportedMethod.name;
    }
}
