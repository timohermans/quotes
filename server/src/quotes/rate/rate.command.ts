export class RateCommand {
    constructor(
        public readonly author: string,
        public readonly quote: string,
        public readonly userRating: number,
    ) {}

    public static fromBody(body: RateCommand): RateCommand {
        return new RateCommand(body.author, body.quote, body.userRating);
    }
}
