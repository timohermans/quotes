import { CommandHandler } from '@nestjs/cqrs';
import { RateCommand } from './rate.command';
import { RateResult } from './rate.result';

@CommandHandler(RateCommand)
export class RateUseCase {
    async execute(_: RateCommand): Promise<RateResult> {
        return Promise.reject('no implemented');
    }
}
