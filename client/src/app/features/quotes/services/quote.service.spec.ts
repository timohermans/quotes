import { QuoteService } from './quote.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { EMPTY, of, throwError } from 'rxjs';
import { QuoteResource } from '../resources/quote.resource';
import * as faker from 'faker';
import { Quote } from '../models/quote.model';
import DoneCallback = jest.DoneCallback;

describe('QuoteService', () => {
  let service: QuoteService;
  let httpClient: HttpClient;

  beforeEach(() => {
    httpClient = new HttpClient(null);
    service = new QuoteService(httpClient);
  });

  it('fetches a random quote from the api', done => {
    const expectedData = {
      author: `${faker.name.firstName()} ${faker.name.lastName()}`,
      quote: faker.random.words(),
    } as QuoteResource;

    jest.spyOn(httpClient, 'get').mockImplementation((url: string) => {
      if (url === `${environment.apiUrl}/quotes/random`) {
        return of(expectedData);
      }

      return EMPTY;
    });

    service.getRandom().subscribe((quote: Quote) => {
      expect(quote).toEqual(Quote.fromResource(expectedData));
      done();
    });
  });

  it('Shows an error quote when the api call fails', (done: DoneCallback) => {
    jest.spyOn(httpClient, 'get').mockImplementation(() => {
      return throwError({
        status: 503,
      });
    });

    service.getRandom().subscribe((quote: Quote) => {
      expect(quote).toEqual(
        new Quote(
          'Timo',
          'Sometimes a quote is not available. Then, we have to try again later.'
        )
      );
      done();
    });
  });
});
