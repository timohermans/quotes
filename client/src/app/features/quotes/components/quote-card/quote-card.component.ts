import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Quote } from '../../models/quote.model';

@Component({
  selector: 'app-quote-card',
  template: `
    <div class="card is-rounded has-horizontal-margin">
      <div class="card-content">
        <div class="has-bottom-margin" *ngIf="quote">
          <p class="title has-text-centered">
            <span class="has-text-danger">"</span>{{ quote.quote
            }}<span class="has-text-danger">"</span>
          </p>
          <p></p>
          <div class="is-flex has-space-between-content">
            <div>
              <app-quote-rating
                *ngIf="canVote"
                (ratingSelect)="rateQuote($event)"
              ></app-quote-rating>
            </div>
            <p class="subtitle has-text-right">
              {{ quote.author }}
            </p>
          </div>
        </div>
      </div>

      <app-loading-indicator></app-loading-indicator>
    </div>
  `,
  styleUrls: ['./quote-card.component.scss'],
})
export class QuoteCardComponent {
  @Input() quote: Quote;
  @Input() canVote = true;
  @Output() rate = new EventEmitter<Quote>();

  public rateQuote(rating: number): void {
    if (!this.quote) {
      return;
    }

    this.quote.userRating = rating;

    this.rate.emit(this.quote);
  }
}
