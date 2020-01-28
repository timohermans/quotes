import { QuoteRandomComponent } from './quote-random.component';
import { QuoteService } from '../../services/quote.service';
import { Quote } from '../../models/quote.model';
import { of } from 'rxjs';
import { IsLoadingService } from '@service-work/is-loading';
import { take } from 'rxjs/operators';
import { createRandomQuote } from '../../quotes.test-utils';
import DoneCallback = jest.DoneCallback;
import { fakeAsync, tick } from '@angular/core/testing';

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

  it('saves a rating of a quote through the service', () => {
    // arrange
    const expectedQuote = createRandomQuote();
    service.getRandom.mockReturnValue(of(expectedQuote));
    service.rateQuote.mockReturnValue(of(expectedQuote));

    component = new QuoteRandomComponent(service, loadingService);
    expectedQuote.userRating = 5;

    // act
    component.saveQuoteRating(expectedQuote);

    // assert
    expect(loadingService.add.mock.calls.length).toBe(2);
    expect(loadingService.add.mock.calls[1][1]).toEqual({ key: 'rating' });
    expect(service.rateQuote.mock.calls[0][0]).toEqual(expectedQuote);
  });

  it('after the rating is saved, show a new quote after a short delay', fakeAsync(() => {
    // arrange
    const expectedQuote = createRandomQuote();
    const secondExpectedQuote = createRandomQuote();

    service.getRandom.mockReturnValueOnce(of(expectedQuote));
    service.getRandom.mockReturnValueOnce(of(secondExpectedQuote));
    service.rateQuote.mockReturnValue(of(expectedQuote));

    component = new QuoteRandomComponent(service, loadingService);
    expectedQuote.userRating = 5;

    // act
    component.saveQuoteRating(expectedQuote);

    expect(component.isGoingToGetNewQuote).toBeTruthy();

    tick(QuoteService.delayForNewQuote);

    // assert
    expect(component.isGoingToGetNewQuote).toBeFalsy();
    component.quote$.subscribe((quote: Quote) => {
      expect(quote).toEqual(secondExpectedQuote);
    });
  }));

  it('cannot get a new quote when it is already intending to do so', () => {
    // arrange
    const expectedFirstQuote = createRandomQuote();
    service.getRandom.mockReturnValueOnce(of(expectedFirstQuote));

    component = new QuoteRandomComponent(service, loadingService);
    component.isGoingToGetNewQuote = true;

    // act
    component.getNewRandomQuote();

    expect(service.getRandom.mock.calls.length).toBe(1);
  });
});
