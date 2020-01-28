import { HttpModule, Module } from '@nestjs/common';
import { QuotesController } from './quotes.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { GetRandomUseCase } from './get-random/get-random.use-case';
import { DatabaseService } from '../core/database.service';
import { RateUseCase } from './rate/rate.use-case';

const useCases = [GetRandomUseCase, RateUseCase];

@Module({
    imports: [CqrsModule, HttpModule],
    providers: [...useCases, DatabaseService],
    controllers: [QuotesController],
})
export class QuotesModule {}
