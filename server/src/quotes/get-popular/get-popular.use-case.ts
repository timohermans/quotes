import { CommandHandler } from '@nestjs/cqrs';
import { DatabaseService } from '../../core/database.service';
import GetPopularRequest from './get-popular.request';
import { GetPopularResult } from './get-popular.result';
import { QuoteDocument } from '../quote.entity';

@CommandHandler(GetPopularRequest)
export class GetPopularUseCase {
    private readonly collectionKey = 'quotes';
    private readonly orderByField = 'amountOfVotes';

    constructor(private readonly database: DatabaseService) {}

    async execute(_: GetPopularRequest): Promise<GetPopularResult> {
        const documents: QuoteDocument[] = await this.database.getHeadSorted<
            QuoteDocument
        >(this.collectionKey, this.orderByField, 5);

        return GetPopularResult.fromDocuments(documents);
    }
}
