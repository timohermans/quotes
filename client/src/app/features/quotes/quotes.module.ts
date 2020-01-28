import { NgModule } from '@angular/core';

import { QuotesRoutingModule } from './quotes-routing.module';
import { QuoteRandomComponent } from './pages/quote-random/quote-random.component';
import { QuoteCardComponent } from './components/quote-card/quote-card.component';
import { SharedModule } from '../../shared/shared.module';
import { QuoteRatingComponent } from './components/quote-rating/quote-rating.component';
import { QuotePopularListComponent } from './components/quote-popular-list/quote-popular-list.component';
import { QuoteRatingResultComponent } from './components/quote-rating-result/quote-rating-result.component';

@NgModule({
  declarations: [
    QuoteRandomComponent,
    QuoteCardComponent,
    QuoteRatingComponent,
    QuotePopularListComponent,
    QuoteRatingResultComponent,
  ],
  imports: [SharedModule, QuotesRoutingModule],
})
export class QuotesModule {}
