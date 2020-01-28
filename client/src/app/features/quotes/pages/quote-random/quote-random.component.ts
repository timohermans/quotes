import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../../services/quote.service';
import { Quote } from '../../models/quote.model';
import { Observable } from 'rxjs';
import { IsLoadingService } from '@service-work/is-loading';
import { delay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-quote-random',
  templateUrl: './quote-random.component.html',
  styleUrls: ['./quote-random.component.scss'],
})
export class QuoteRandomComponent implements OnInit {
  public quote$: Observable<Quote> = this.loadRandomQuote();
  public popularQuotes$: Observable<Quote[]> = this.quoteService.getPopular();
  public isGoingToGetNewQuote = false;

  constructor(
    private quoteService: QuoteService,
    private loadingService: IsLoadingService
  ) {}

  ngOnInit() {}

  public getNewRandomQuote(): void {
    if (this.isGoingToGetNewQuote) {
      return;
    }

    this.quote$ = this.loadRandomQuote();
  }

  private loadRandomQuote(): Observable<Quote> {
    return this.loadingService.add(this.quoteService.getRandom(), {
      key: 'random',
    });
  }

  public saveQuoteRating(quote: Quote): void {
    const saveQuote$ = this.quoteService
      .rateQuote(quote)
      .pipe(
        tap(() => {
          this.isGoingToGetNewQuote = true;
        }),
        delay(QuoteService.delayForNewQuote),
        tap(() => {
          this.isGoingToGetNewQuote = false;
        })
      )
      .subscribe(() => {
        this.popularQuotes$ = this.quoteService.getPopular();
        this.quote$ = this.loadRandomQuote();
      });

    this.loadingService.add(saveQuote$, {
      key: QuoteService.loadingKeyForRating,
    });
  }
}
