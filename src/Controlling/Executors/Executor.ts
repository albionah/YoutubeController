export interface Executor<RESULT_DATA>
{
    execute(): Promise<RESULT_DATA>;
}
