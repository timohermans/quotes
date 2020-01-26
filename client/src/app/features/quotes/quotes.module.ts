import { NgModule } from '@angular/core';

import { QuotesRoutingModule } from './quotes-routing.module';
import { QuoteRandomComponent } from './pages/quote-random/quote-random.component';
import { QuoteCardComponent } from './components/quote-card/quote-card.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [QuoteRandomComponent, QuoteCardComponent],
  imports: [SharedModule, QuotesRoutingModule],
})
export class QuotesModule {}
