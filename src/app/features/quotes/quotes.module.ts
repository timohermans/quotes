import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotesRoutingModule } from './quotes-routing.module';
import { QuoteRandomComponent } from './pages/quote-random/quote-random.component';


@NgModule({
  declarations: [QuoteRandomComponent],
  imports: [
    CommonModule,
    QuotesRoutingModule
  ]
})
export class QuotesModule { }
