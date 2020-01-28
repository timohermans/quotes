export default class GetPopularResultItem {
    constructor(
        public readonly author: string,
        public readonly quote: string,
        public readonly ratingAverage: number,
        public readonly amountOfVotes: number,
    ) {}
}
