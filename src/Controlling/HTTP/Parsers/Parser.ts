import {HttpRequest} from "../HttpRequest";

export interface Parser<OPTIONS>
{
    parse(request: HttpRequest): Promise<OPTIONS>;
}
