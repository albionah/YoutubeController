export class Url
{
    public route: string;
    public querystring: {get: (name: string) => string | null};

    public constructor(url: string)
    {
        const parsedUrl = new URL(`http://hostname${url}`);
        this.route = parsedUrl.pathname;
        this.querystring = parsedUrl.searchParams;
    }
}
