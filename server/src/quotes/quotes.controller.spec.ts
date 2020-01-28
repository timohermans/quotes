import { Test, TestingModule } from '@nestjs/testing';
import { QuotesController } from './quotes.controller';
import * as faker from 'faker';
import { CommandBus } from '@nestjs/cqrs';
import { GetRandomResult } from './get-random/get-random.result';
import { ServiceUnavailableException } from '@nestjs/common';
import { RateCommand } from './rate/rate.command';
import { RateResult } from './rate/rate.result';

describe('Quotes Controller', () => {
    let controller: QuotesController;
    let commandBus: CommandBus;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [QuotesController],
            providers: [CommandBus],
        }).compile();

        controller = module.get<QuotesController>(QuotesController);
        commandBus = module.get(CommandBus);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('fetches a random quote', async () => {
        const randomResult = new GetRandomResult(
            faker.name.firstName(),
            faker.random.words(20),
        );

        jest.spyOn(commandBus, 'execute').mockImplementation(() =>
            Promise.resolve(randomResult),
        );

        const response: GetRandomResult = await controller.getRandom();

        expect(response).toEqual(randomResult);
    });

    it('returns a service unavailable when use case fails', async () => {
        jest.spyOn(commandBus, 'execute').mockImplementation(() => {
            throw new ServiceUnavailableException();
        });

        try {
            await controller.getRandom();
        } catch (error) {
            expect(error.message).toEqual({
                error: 'Service Unavailable',
                statusCode: 503,
            });
        }
    });

    it('saves the rating of a quote', async () => {
        const quoteAuthor = faker.name.firstName();
        const quoteContent = faker.random.words(20);
        const rating = faker.random.number(5);
        const expectedResult = new RateResult(
            faker.random.word(),
            faker.random.words(),
        );

        jest.spyOn(commandBus, 'execute').mockImplementation(() =>
            Promise.resolve(expectedResult),
        );

        const response = await controller.rate(
            new RateCommand(quoteAuthor, quoteContent, rating),
        );

        expect(response).toEqual(expectedResult);
    });
});
