import { Quote } from './models/quote.model';
import * as faker from 'faker';

export const createRandomQuote = () =>
  new Quote(faker.name.firstName(), faker.random.words(5));
