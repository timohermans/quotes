import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quote } from '../models/quote.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { QuoteResource } from '../resources/quote.resource';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  constructor(private httpClient: HttpClient) {}

  public getRandom(): Observable<Quote> {
    return this.httpClient
      .get<QuoteResource>(`${environment.apiUrl}/quotes/random`)
      .pipe(map(resource => Quote.fromResource(resource)));
  }
}
