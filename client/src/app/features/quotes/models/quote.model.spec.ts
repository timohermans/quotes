import { Quote } from './quote.model';

describe('QuoteModel', () => {
  it('maps an API resource to a quote object', () => {
    const json = {
      author: 'C. A. R. Hoare',
      quote:
        'There are two ways of constructing a software design; one way is to make it so simple that there are ' +
        'obviously no deficiencies, and the other way is to make it so complicated that there are no obvious ' +
        'deficiencies. The first method is far more difficult.',
    };

    const quote = Quote.fromResource(json);

    expect(quote).toMatchSnapshot();
  });
});