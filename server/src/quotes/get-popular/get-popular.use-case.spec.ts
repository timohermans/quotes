import { DatabaseService } from '../../core/database.service';
import { GetPopularUseCase } from './get-popular.use-case';
import { QuoteDocument } from '../quote.entity';
import * as faker from 'faker';
import GetPopularRequest from './get-popular.request';

jest.mock('../../core/database.service');

describe('GetPopularUseCase', () => {
    it('can retrieves popular quotes from the store', async () => {
        // arrange
        const database = new DatabaseService(null) as jest.Mocked<
            DatabaseService
        >;

        const expectedQuote = {
            author: faker.name.firstName(),
            quote: faker.random.words(),
            ratingAverage: faker.random.number(),
            ratingTotal: faker.random.number(),
            amountOfVotes: faker.random.number(),
        } as QuoteDocument;

        database.getHeadSorted.mockReturnValue(
            Promise.resolve([expectedQuote]),
        );

        const component = new GetPopularUseCase(database);

        // act
        const result = await component.execute(new GetPopularRequest());

        // assert
        expect(result.quotes).toEqual([
            {
                author: expectedQuote.author,
                quote: expectedQuote.quote,
                ratingAverage: expectedQuote.ratingAverage,
                amountOfVotes: expectedQuote.amountOfVotes,
            },
        ]);
    });
});
