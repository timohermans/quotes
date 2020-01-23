import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuoteRandomComponent } from './pages/quote-random/quote-random.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'quotes/random',
        pathMatch: 'full',
    },
    {
        path: 'random',
        component: QuoteRandomComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class QuotesRoutingModule {}
