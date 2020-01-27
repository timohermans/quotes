import { GetRandomUseCase } from './get-random.use-case';
import { HttpService, ServiceUnavailableException } from '@nestjs/common';
import { GetRandomRequest } from './get-random.request';
import { EMPTY, of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { GetRandomResult } from './get-random.result';
import { ConfigService } from '@nestjs/config';
import * as faker from 'faker';

describe('Quote - UseCase - GetRandom', () => {
    let useCase: GetRandomUseCase;
    let httpService: HttpService;
    let configService: ConfigService;

    beforeEach(() => {
        httpService = new HttpService();
        configService = new ConfigService();
        useCase = new GetRandomUseCase(httpService, configService);
    });

    it('retrieves a random quote from the external API', async () => {
        // arrange
        const externalApi = faker.internet.url();
        jest.spyOn(configService, 'get').mockImplementation((key: string) =>
            key === 'QUOTES_EXTERNAL_API_URL' ? externalApi : null,
        );
        const apiResponse: AxiosResponse = {
            data: {
                author: 'Sam Ewing',
                id: 33,
                quote:
                    'Computers are like bikinis. They save people a lot of guesswork.',
                permalink: 'http://quotes.stormconsultancy.co.uk/quotes/33',
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        };

        jest.spyOn(httpService, 'get').mockImplementation((url: string) => {
            if (url === externalApi) {
                return of(apiResponse);
            }
            return EMPTY;
        });

        // act
        const result = await useCase.execute(new GetRandomRequest());

        // assert
        expect(result).toEqual(
            new GetRandomResult(
                apiResponse.data.author,
                apiResponse.data.quote,
            ),
        );
    });

    it('throws an error when the external api is not available', async () => {
        jest.spyOn(httpService, 'get').mockImplementation(() => {
            throw new Error('Error code 0');
        });

        // act
        try {
            await useCase.execute(new GetRandomRequest());
        } catch (error) {
            expect(error instanceof ServiceUnavailableException).toBeTruthy();
        }
    });
});
