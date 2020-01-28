import { Entity } from '../core/entity.class';

export class QuoteEntity extends Entity {
    constructor(
        public readonly author: string,
        public readonly quote: string,
        private ratingTotal: number = 0,
        private ratingAverage: number = 0,
        private amountOfVotes: number = 0,
    ) {
        super();
    }

    public toDocument(): QuoteDocument {
        return {
            author: this.author,
            quote: this.quote,
            ratingAverage: this.ratingAverage,
            ratingTotal: this.ratingTotal,
            amountOfVotes: this.amountOfVotes,
        } as QuoteDocument;
    }

    public addRating(rating: number) {
        this.amountOfVotes += 1;
        this.ratingTotal += rating;
        this.ratingAverage = this.ratingTotal / this.amountOfVotes;
    }
}

export interface QuoteDocument {
    author: string;
    quote: string;
    ratingAverage: number;
    amountOfVotes: number;
    ratingTotal: number;
}
