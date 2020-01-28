import { NgModule } from '@angular/core';

import { QuotesRoutingModule } from './quotes-routing.module';
import { QuoteRandomComponent } from './pages/quote-random/quote-random.component';
import { QuoteCardComponent } from './components/quote-card/quote-card.component';
import { SharedModule } from '../../shared/shared.module';
import { QuoteRatingComponent } from './components/quote-rating/quote-rating.component';

@NgModule({
  declarations: [QuoteRandomComponent, QuoteCardComponent, QuoteRatingComponent],
  imports: [SharedModule, QuotesRoutingModule],
})
export class QuotesModule {}
