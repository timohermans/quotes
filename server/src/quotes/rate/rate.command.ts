export class RateCommand {
    constructor(
        public readonly author: string,
        public readonly quote: string,
        public readonly rating: number,
    ) {}
}
