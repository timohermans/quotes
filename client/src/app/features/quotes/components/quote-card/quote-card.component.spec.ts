import { QuoteCardComponent } from './quote-card.component';
import { QuoteRating } from '../../models/quote.model';
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
    const assertFn = (quoteRating: QuoteRating) => {
      expect(quoteRating).toEqual({
        quote: expectedQuote,
        rating: expectedRating,
      });

      done();
    };

    // act
    component.quoteRating.pipe(take(1)).subscribe(assertFn);
    component.rateQuote(5);
  });
});
