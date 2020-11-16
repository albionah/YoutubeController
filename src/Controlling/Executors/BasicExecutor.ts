import {YoutubeInstanceAccessor} from '../../YoutubeInstanceAccessor';
import {Executor} from './Executor';

export abstract class BasicExecutor<OPTIONS, RESULT_DATA> implements Executor<OPTIONS, RESULT_DATA>
{
    protected readonly youtubeManager: YoutubeInstanceAccessor;

    public constructor(youtubeManager: YoutubeInstanceAccessor)
    {
        this.youtubeManager = youtubeManager;
    }

    public abstract execute(options: OPTIONS): Promise<RESULT_DATA>;
}
