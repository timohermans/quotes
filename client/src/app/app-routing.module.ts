import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'quotes/random',
        pathMatch: 'full',
    },
    {
        path: 'quotes',
        loadChildren: () =>
            import('./features/quotes/quotes.module').then(
                mod => mod.QuotesModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
