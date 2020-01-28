export interface QuoteResource {
  author: string;
  quote: string;
  ratingAverage?: number;
  amountOfVotes?: number;
}

export interface QuoteResourceCollection {
  quotes: QuoteResource[];
}
