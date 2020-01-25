import { QuoteService } from './quote.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { EMPTY, of } from 'rxjs';
import { QuoteResource } from '../resources/quote.resource';
import * as faker from 'faker';
import { Quote } from '../models/quote.model';

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
});
