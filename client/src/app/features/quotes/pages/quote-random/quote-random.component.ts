import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../../services/quote.service';
import { Quote } from '../../models/quote.model';
import { Observable } from 'rxjs';
import { IsLoadingService } from '@service-work/is-loading';

@Component({
  selector: 'app-quote-random',
  templateUrl: './quote-random.component.html',
  styleUrls: ['./quote-random.component.scss'],
})
export class QuoteRandomComponent implements OnInit {
  public quote$: Observable<Quote> = this.loadingService.add(
    this.quoteService.getRandom()
  );

  constructor(
    private quoteService: QuoteService,
    private loadingService: IsLoadingService
  ) {}

  ngOnInit() {}
}
