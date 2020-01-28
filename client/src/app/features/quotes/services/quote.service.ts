import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Quote } from '../models/quote.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import {
  QuoteResource,
  QuoteResourceCollection,
} from '../resources/quote.resource';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  public static loadingKeyForRating = 'rating';
  public static delayForNewQuote = 3000;

  private readonly quotesApiUrl = `${environment.apiUrl}/quotes`;

  constructor(private httpClient: HttpClient) {}

  public getRandom(): Observable<Quote> {
    return this.httpClient
      .get<QuoteResource>(`${this.quotesApiUrl}/random`)
      .pipe(
        map(resource => Quote.fromResource(resource)),
        catchError((_: HttpErrorResponse) => {
          return of(
            new Quote(
              'Timo',
              'Sometimes a quote is not available. Then, we have to try again later.'
            )
          );
        })
      );
  }

  public rateQuote(quote: Quote): Observable<Quote> {
    return this.httpClient
      .post<QuoteResource>(`${this.quotesApiUrl}/rate`, quote)
      .pipe(map(resource => Quote.fromResource(resource)));
  }

  public getPopular(): Observable<Quote[]> {
    return this.httpClient
      .get<QuoteResourceCollection>(`${this.quotesApiUrl}/popular`)
      .pipe(
        map(resourceCollection =>
          resourceCollection.quotes.map(resource =>
            Quote.fromResource(resource)
          )
        )
      );
  }
}
