import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Quote } from '../models/quote.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { QuoteResource } from '../resources/quote.resource';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  constructor(private httpClient: HttpClient) {}

  public getRandom(): Observable<Quote> {
    return this.httpClient
      .get<QuoteResource>(`${environment.apiUrl}/quotes/random`)
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
}
