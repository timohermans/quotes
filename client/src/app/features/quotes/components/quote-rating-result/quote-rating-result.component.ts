import { Component, Input, OnInit } from '@angular/core';
import { Quote } from '../../models/quote.model';
import { QuoteService } from '../../services/quote.service';
import { faStar } from '@fortawesome/free-regular-svg-icons/faStar';
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons/faStarHalfAlt';

@Component({
  selector: 'app-quote-rating-result',
  template: `
    <div class="ratings is-flex are-center-aligned">
      <fa-icon
        *ngFor="let rating of ratings; let index = index"
        class="rating"
        [icon]="getIconFor(rating)"
      >
      </fa-icon>
      {{ quote.ratingAverage | number: '1.0-1' }} -
      {{ quote.amountOfVotes }} votes
    </div>
  `,
  styleUrls: ['./quote-rating-result.component.scss'],
})
export class QuoteRatingResultComponent implements OnInit {
  private openStar = faStar;
  private halfStar = faStarHalfAlt;

  @Input() quote: Quote;

  public ratings = QuoteService.ratings;

  constructor() {}

  ngOnInit() {}

  public getIconFor(rating: number) {
    if (!this.quote.ratingAverage) {
      return this.openStar;
    }

    const average = this.quote.ratingAverage;

    if (average >= rating) {
      return fullStar;
    }

    const isBetweenPreviousAndCurrentRating =
      average % (rating - 1) < 1 && average % (rating - 1) > 0;

    if (average < rating && isBetweenPreviousAndCurrentRating) {
      return this.halfStar;
    }

    return this.openStar;
  }
}
