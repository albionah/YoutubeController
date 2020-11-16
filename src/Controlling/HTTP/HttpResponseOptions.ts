export interface HttpResponseOptions<DATA = object | void>
{
    statusCode: number;
    data?: DATA;
}
