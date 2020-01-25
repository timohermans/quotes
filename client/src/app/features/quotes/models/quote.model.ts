import { QuoteResource } from '../resources/quote.resource';

export class Quote {
    constructor(public author: string, public quote: string) {}

    static fromResource(resource: QuoteResource) {
        return new Quote(resource.author, resource.quote);
    }
}
