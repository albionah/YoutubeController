import {Parser} from "./Parser";
import {HttpRequest} from "../HttpRequest";

type Await<T> = T extends Promise<infer PT> ? PT : never;
type UnionToIntersection<U> =
    (U extends any ? (k: U)=>void : never) extends ((k: infer I)=>void) ? I : never;

export class MultiParser<PARSERS extends ReadonlyArray<Parser<object>>, PARSED_VALUES extends UnionToIntersection<Await<ReturnType<PARSERS[number]["parse"]>>>> implements Parser<PARSED_VALUES>
{
    private readonly parsers: PARSERS;

    public constructor(...parsers: PARSERS)
    {
        this.parsers = parsers;
    }

    public async parse(request: HttpRequest): Promise<PARSED_VALUES>
    {
        const allParsersResults = await Promise.all(this.parsers.map((parser) => parser.parse(request)));
        return Object.assign({}, ...allParsersResults);
    }
}
