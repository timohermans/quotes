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

  it('does not show rating results when a quote does not have them', () => {
    const component = new QuoteCardComponent();

    component.quote = createRandomQuote();

    expect(component.areResultsVisible).toBeFalsy();
  });

  it('is not possible to rate a quote when there is none', () => {
    const component = new QuoteCardComponent();
    jest.spyOn(component.rate, 'emit');

    component.rateQuote(5);

    expect(component.quote).toBeFalsy();
    expect(component.rate.emit).not.toHaveBeenCalled();
  });

  it('shows rating result when there are results to show', () => {
    const component = new QuoteCardComponent();

    const quote = createRandomQuote();
    quote.ratingAverage = 3.7;
    quote.amountOfVotes = 15;
    component.quote = quote;

    expect(component.areResultsVisible).toBeTruthy();
  });
});
