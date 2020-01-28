import { QuoteCardComponent } from './quote-card.component';
import { Quote } from '../../models/quote.model';
import { createRandomQuote } from '../../quotes.test-utils';
import { take } from 'rxjs/operators';
import DoneCallback = jest.DoneCallback;

describe('QuoteCardComponent', () => {
  it('Emits a quote rating event when both quote and rating are present', (done: DoneCallback) => {
    // arrange
    const expectedQuote = createRandomQuote();
    const expectedRating = 5;

    const component = new QuoteCardComponent();
    component.quote = expectedQuote;

    // assert
    const assertFn = (quoteRating: Quote) => {
      expectedQuote.userRating = expectedRating;
      expect(quoteRating).toEqual(expectedQuote);

      done();
    };

    // act
    component.rate.pipe(take(1)).subscribe(assertFn);
    component.rateQuote(5);
  });
});
