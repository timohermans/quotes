import { Module } from '@nestjs/common';
import { QuotesModule } from './quotes/quotes.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [QuotesModule, ConfigModule.forRoot({ isGlobal: true })],
    controllers: [],
    providers: [],
})
export class AppModule {}
