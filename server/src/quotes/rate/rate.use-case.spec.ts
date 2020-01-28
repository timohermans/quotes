import { BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../../core/database.service';
import { RateUseCase } from './rate.use-case';
import { RateCommand } from './rate.command';
import * as faker from 'faker';
import { RateResult } from './rate.result';
import { QuoteDocument } from '../quote.entity';

jest.mock('../../core/database.service');

describe('Quote - UseCase - GetRandom', () => {
    it('throws when not suplying missing data', async () => {
        const databaseService = new DatabaseService(null);
        const commands = [
            new RateCommand(null, faker.random.word(), faker.random.number(5)),
            new RateCommand(faker.random.word(), null, faker.random.number(5)),
            new RateCommand(faker.random.word(), faker.random.words(), null),
        ];

        for (const command of commands) {
            try {
                const useCase = new RateUseCase(databaseService);
                await useCase.execute(command);
            } catch (error) {
                expect(error instanceof BadRequestException).toBeTruthy();
            }
        }
    });

    it('sucessfully sets a new quote when there is none saved yet', async () => {
        // arrange
        const expectedResult = new RateResult(
            faker.random.word(),
            faker.random.words(20),
        );
        const expectedRating = faker.random.number(5);

        const databaseService = new DatabaseService(null) as jest.Mocked<
            DatabaseService
        >;
        databaseService.getBy.mockReturnValue(Promise.resolve(null));
        databaseService.save.mockReturnValue(Promise.resolve());

        const useCase = new RateUseCase(databaseService);

        // act
        await useCase.execute(
            new RateCommand(
                expectedResult.author,
                expectedResult.quote,
                expectedRating,
            ),
        );

        // assert
        expect(databaseService.save.mock.calls[0][0]).toEqual('quotes');
        expect(databaseService.save.mock.calls[0][1]).toEqual(
            expectedResult.quote,
        );
        expect(databaseService.save.mock.calls[0][2]).toEqual({
            quote: expectedResult.quote,
            author: expectedResult.author,
            ratingAverage: expectedRating,
            ratingTotal: expectedRating,
            amountOfVotes: 1,
        } as QuoteDocument);
    });

    it('sucessfully updates the rating when there is an existing quote', async () => {
        // arrange
        const expectedResult = new RateResult(
            faker.random.word(),
            faker.random.words(20),
        );

        const databaseService = new DatabaseService(null) as jest.Mocked<
            DatabaseService
        >;
        databaseService.getBy.mockReturnValue(
            Promise.resolve({
                author: expectedResult.author,
                quote: expectedResult.quote,
                ratingTotal: 15,
                amountOfVotes: 3,
                ratingAverage: 5,
            } as QuoteDocument),
        );
        databaseService.save.mockReturnValue(Promise.resolve());

        const useCase = new RateUseCase(databaseService);

        // act
        await useCase.execute(
            new RateCommand(expectedResult.author, expectedResult.quote, 4),
        );

        // assert
        expect(databaseService.save.mock.calls[0][0]).toEqual('quotes');
        expect(databaseService.save.mock.calls[0][1]).toEqual(
            expectedResult.quote,
        );
        expect(databaseService.save.mock.calls[0][2]).toEqual({
            quote: expectedResult.quote,
            author: expectedResult.author,
            ratingAverage: 4.75,
            ratingTotal: 19,
            amountOfVotes: 4,
        } as QuoteDocument);
    });
});
