import { Controller, Get } from '@nestjs/common';
import { GetRandomResult } from './get-random/get-random.result';
import { CommandBus } from '@nestjs/cqrs';
import { GetRandomRequest } from './get-random/get-random.request';

@Controller('quotes')
export class QuotesController {
    constructor(private readonly commandBus: CommandBus) {}

    @Get('random')
    async getRandom(): Promise<GetRandomResult> {
        return await this.commandBus.execute(new GetRandomRequest());
    }
}