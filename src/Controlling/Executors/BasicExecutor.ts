import {YoutubeInstanceAccessor} from '../../DataTypes/YoutubeInstanceAccessor';
import {Executor} from './Executor';

export abstract class BasicExecutor<RESULT_DATA> implements Executor<RESULT_DATA>
{
    protected readonly youtubeManager: YoutubeInstanceAccessor;

    public constructor(youtubeManager: YoutubeInstanceAccessor)
    {
        this.youtubeManager = youtubeManager;
    }

    public abstract execute(): Promise<RESULT_DATA>;
}
