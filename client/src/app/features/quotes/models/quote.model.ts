import { QuoteResource } from '../resources/quote.resource';

export class Quote {
  public userRating: number;
  public ratingAverage: number;
  public amountOfVotes: number;

  constructor(public author: string, public quote: string) {}

  static fromResource(resource: QuoteResource) {
    const quote = new Quote(resource.author, resource.quote);

    quote.ratingAverage = resource.ratingAverage;
    quote.amountOfVotes = resource.amountOfVotes;
    return quote;
  }
}
