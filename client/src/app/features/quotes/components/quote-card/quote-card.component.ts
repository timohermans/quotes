import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Quote, QuoteRating } from '../../models/quote.model';

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
          <p class="subtitle has-text-right">
            {{ quote.author }}
          </p>
        </div>
        <div class="card-footer">
          <app-quote-rating
            (ratingSelect)="rateQuote($event)"
          ></app-quote-rating>
        </div>
      </div>

      <app-loading-indicator></app-loading-indicator>
    </div>
  `,
  styleUrls: ['./quote-card.component.scss'],
})
export class QuoteCardComponent {
  @Input() quote: Quote;
  @Output() quoteRating = new EventEmitter<QuoteRating>();

  public rateQuote(rating: number): void {
    if (!this.quote) {
      return;
    }

    this.quoteRating.emit({
      quote: this.quote,
      rating,
    });
  }
}
