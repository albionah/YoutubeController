import {IncomingMessage} from 'http';

export interface Parser<OPTIONS>
{
    parse(request: IncomingMessage): Promise<OPTIONS>;
}
