import {Json} from "./Parsers/JsonBodyDataGetter";

export interface HttpRequest
{
    method?: string;
    url?: string;
    body?: Json;
}
