import { QuoteRatingResultComponent } from './quote-rating-result.component';
import { Quote } from '../../models/quote.model';
import * as faker from 'faker';
import { faStar } from '@fortawesome/free-regular-svg-icons/faStar';
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons/faStarHalfAlt';

describe('QuoteRatingResultComponent', () => {
  const openStar = faStar;
  const halfStar = faStarHalfAlt;

  it('should show 4 and a half stars when rating is above 4 and below 5', () => {
    const component = new QuoteRatingResultComponent();

    component.quote = Quote.fromResource({
      quote: faker.random.words(),
      author: faker.name.firstName(),
      amountOfVotes: faker.random.number(),
      ratingAverage: 3.4,
    });

    expect(component.getIconFor(1)).toEqual(fullStar);
    expect(component.getIconFor(2)).toEqual(fullStar);
    expect(component.getIconFor(3)).toEqual(fullStar);
    expect(component.getIconFor(4)).toEqual(halfStar);
    expect(component.getIconFor(5)).toEqual(openStar);
  });

  it('should show all full stars when average is 5', () => {
    const component = new QuoteRatingResultComponent();

    component.quote = Quote.fromResource({
      quote: faker.random.words(),
      author: faker.name.firstName(),
      amountOfVotes: faker.random.number(),
      ratingAverage: 5,
    });

    expect(component.getIconFor(1)).toEqual(fullStar);
    expect(component.getIconFor(2)).toEqual(fullStar);
    expect(component.getIconFor(3)).toEqual(fullStar);
    expect(component.getIconFor(4)).toEqual(fullStar);
    expect(component.getIconFor(5)).toEqual(fullStar);
  });

  it('should only show one full star at an average of one', () => {
    const component = new QuoteRatingResultComponent();

    component.quote = Quote.fromResource({
      quote: faker.random.words(),
      author: faker.name.firstName(),
      amountOfVotes: faker.random.number(),
      ratingAverage: 1,
    });

    expect(component.getIconFor(1)).toEqual(fullStar);
    expect(component.getIconFor(2)).toEqual(openStar);
    expect(component.getIconFor(3)).toEqual(openStar);
    expect(component.getIconFor(4)).toEqual(openStar);
    expect(component.getIconFor(5)).toEqual(openStar);
  });
});
