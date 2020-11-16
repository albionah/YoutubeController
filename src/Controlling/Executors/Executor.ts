export interface Executor<OPTIONS, RESULT_DATA>
{
    execute(options: OPTIONS): Promise<RESULT_DATA>;
}
