import { QuoteRandomComponent } from './quote-random.component';
import { QuoteService } from '../../services/quote.service';
import { Quote } from '../../models/quote.model';
import { of } from 'rxjs';
import { IsLoadingService } from '@service-work/is-loading';
import { take } from 'rxjs/operators';
import { createRandomQuote } from '../../quotes.test-utils';
import DoneCallback = jest.DoneCallback;

jest.mock('../../services/quote.service');
jest.mock('@service-work/is-loading');

describe('QuoteRandomComponent', () => {
  let component: QuoteRandomComponent;
  let service: jest.Mocked<QuoteService>;
  let loadingService: jest.Mocked<IsLoadingService>;

  beforeEach(() => {
    service = new QuoteService(null) as jest.Mocked<QuoteService>;
    loadingService = new IsLoadingService() as jest.Mocked<IsLoadingService>;
    loadingService.add.mockImplementation(sub => sub);
  });

  it('fetches a random quote on page start', (done: DoneCallback) => {
    // arrange
    const expectedQuote = createRandomQuote();

    service.getRandom.mockReturnValue(of(expectedQuote));

    // act
    component = new QuoteRandomComponent(service, loadingService);

    // assert
    component.quote$.subscribe((quote: Quote) => {
      expect(quote).toEqual(expectedQuote);
      done();
    });
  });

  it('fetches a new quote when user asks for it', (done: DoneCallback) => {
    // arrange
    const expectedFirstQuote = createRandomQuote();
    const expectedSecondQuote = createRandomQuote();
    service.getRandom
      .mockReturnValueOnce(of(expectedFirstQuote))
      .mockReturnValueOnce(of(expectedSecondQuote));

    component = new QuoteRandomComponent(service, loadingService);

    // act
    component.getNewRandomQuote();

    // assert
    component.quote$.pipe(take(1)).subscribe((quote: Quote) => {
      expect(quote).toEqual(expectedSecondQuote);
      done();
    });
  });
});
