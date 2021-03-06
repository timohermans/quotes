import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetRandomResult } from './get-random/get-random.result';
import { CommandBus } from '@nestjs/cqrs';
import { GetRandomRequest } from './get-random/get-random.request';
import { RateCommand } from './rate/rate.command';
import { RateResult } from './rate/rate.result';
import { GetPopularResult } from './get-popular/get-popular.result';
import GetPopularRequest from './get-popular/get-popular.request';

@Controller('quotes')
export class QuotesController {
    constructor(private readonly commandBus: CommandBus) {}

    @Get('random')
    async getRandom(): Promise<GetRandomResult> {
        return await this.commandBus.execute(new GetRandomRequest());
    }

    @Post('rate')
    async rate(@Body() command: RateCommand): Promise<RateResult> {
        return await this.commandBus.execute(command);
    }

    @Get('popular')
    async getPopular(): Promise<GetPopularResult> {
        return await this.commandBus.execute(new GetPopularRequest());
    }
}
