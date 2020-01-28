import { QuoteRandomComponent } from './quote-random.component';
import { QuoteService } from '../../services/quote.service';
import DoneCallback = jest.DoneCallback;
import { Quote } from '../../models/quote.model';
import * as faker from 'faker';
import { of } from 'rxjs';
import { IsLoadingService } from '@service-work/is-loading';
import { take } from 'rxjs/operators';

jest.mock('../../services/quote.service');
jest.mock('@service-work/is-loading');

describe('QuoteRandomComponent', () => {
  let component: QuoteRandomComponent;
  let service: jest.Mocked<QuoteService>;
  let loadingService: jest.Mocked<IsLoadingService>;

  const createRandomQuote = () =>
    new Quote(faker.name.firstName(), faker.random.words(5));

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
