import { HttpModule, Module } from '@nestjs/common';
import { QuotesController } from './quotes.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { GetRandomUseCase } from './get-random/get-random.use-case';

const useCases = [GetRandomUseCase];

@Module({
    imports: [CqrsModule, HttpModule],
    providers: [...useCases],
    controllers: [QuotesController],
})
export class QuotesModule {}
