import { QuoteRandomComponent } from './quote-random.component';
import { QuoteService } from '../../services/quote.service';
import DoneCallback = jest.DoneCallback;
import { Quote } from '../../models/quote.model';
import * as faker from 'faker';
import { of } from 'rxjs';
import { IsLoadingService } from '@service-work/is-loading';

jest.mock('../../services/quote.service');
jest.mock('@service-work/is-loading');

describe('QuoteRandomComponent', () => {
    let component: QuoteRandomComponent;
    let service: jest.Mocked<QuoteService>;
    let loadingService: jest.Mocked<IsLoadingService>;

    beforeEach(() => {
        service = new QuoteService(null) as jest.Mocked<QuoteService>;
        loadingService = new IsLoadingService() as jest.Mocked<
            IsLoadingService
        >;
        loadingService.add.mockImplementation(sub => sub);
    });

    it('fetches a random quote on page start', (done: DoneCallback) => {
        // arrange
        const expectedQuote = new Quote(
            faker.name.firstName(),
            faker.random.words(5)
        );
        service.getRandom.mockReturnValue(of(expectedQuote));

        // act
        component = new QuoteRandomComponent(service, loadingService);

        // assert
        component.quote$.subscribe((quote: Quote) => {
            expect(quote).toEqual(expectedQuote);
            done();
        });
    });
});
