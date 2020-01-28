import { CommandHandler } from '@nestjs/cqrs';
import { RateCommand } from './rate.command';
import { RateResult } from './rate.result';
import { DatabaseService } from '../../core/database.service';
import { QuoteDocument, QuoteEntity } from '../quote.entity';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(RateCommand)
export class RateUseCase {
    private readonly collectionKey = 'quotes';

    constructor(private readonly databaseService: DatabaseService) {}

    async execute(command: RateCommand): Promise<RateResult> {
        if (!command.author || !command.quote || !command.userRating) {
            throw new BadRequestException();
        }

        const quoteDocument = await this.databaseService.getBy<QuoteDocument>(
            this.collectionKey,
            command.quote,
        );

        let quote: QuoteEntity;

        if (quoteDocument) {
            quote = new QuoteEntity(
                quoteDocument.author,
                quoteDocument.quote,
                quoteDocument.ratingTotal,
                quoteDocument.ratingAverage,
                quoteDocument.amountOfVotes,
            );
        } else {
            quote = new QuoteEntity(command.author, command.quote);
        }

        quote.addRating(command.userRating);

        return this.databaseService
            .save(this.collectionKey, quote.quote, quote)
            .then(() => new RateResult(quote.author, quote.quote));
    }
}
