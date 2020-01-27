import { Component, Input } from '@angular/core';
import { Quote } from '../../models/quote.model';

@Component({
  selector: 'app-quote-card',
  template: `
    <div class="card is-rounded has-horizontal-margin">
      <div class="card-content">
        <div *ngIf="quote">
          <p class="title has-text-centered">
            <span class="has-text-danger">"</span>{{ quote.quote
            }}<span class="has-text-danger">"</span>
          </p>
          <p></p>
          <p class="subtitle has-text-right">
            {{ quote.author }}
          </p>
        </div>
      </div>

      <app-loading-indicator></app-loading-indicator>
    </div>
  `,
  styleUrls: ['./quote-card.component.scss'],
})
export class QuoteCardComponent {
  @Input() quote: Quote;
}
