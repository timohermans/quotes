import { CommandHandler } from '@nestjs/cqrs';
import { GetRandomResult } from './get-random.result';
import { GetRandomRequest } from './get-random.request';
import { HttpService, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RandomQuote } from './random-quote.interface';

@CommandHandler(GetRandomRequest)
export class GetRandomUseCase {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {}

    // async execute(request: GetRequest) {
    async execute(request: GetRandomRequest): Promise<GetRandomResult> {
        const externalApiUrl = this.configService.get(
            'QUOTES_EXTERNAL_API_URL',
        );

        try {
            const result = await this.httpService
                .get<RandomQuote>(externalApiUrl)
                .toPromise();

            return new GetRandomResult(result.data.author, result.data.quote);
        } catch (error) {
            throw new ServiceUnavailableException();
        }
    }
}
