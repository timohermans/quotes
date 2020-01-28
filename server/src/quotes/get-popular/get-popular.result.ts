import { QuoteDocument } from '../quote.entity';
import GetPopularResultItem from './get-popular-item.result';

export class GetPopularResult {
    public quotes: GetPopularResultItem[];

    constructor() {
        this.quotes = [];
    }

    public static fromDocuments(quoteDocuments: QuoteDocument[]): GetPopularResult {
        const result = new GetPopularResult();

        if (quoteDocuments) {
            result.quotes = quoteDocuments.map(
                (quoteDocument: QuoteDocument) =>
                    new GetPopularResultItem(
                        quoteDocument.author,
                        quoteDocument.quote,
                        quoteDocument.ratingAverage,
                        quoteDocument.amountOfVotes,
                    ),
            );
        }

        return result;
    }
}
