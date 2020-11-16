import {BasicExecutor} from './BasicExecutor';

export class PlayExecutor extends BasicExecutor<{id: number}, void>
{
    public async execute({id}: {id: number}): Promise<void>
    {
        await this.youtubeManager.get(id).play();
    }
}
