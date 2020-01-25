import { NgModule } from '@angular/core';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

const sharedComponents = [NavBarComponent];

@NgModule({
    declarations: [...sharedComponents],
    exports: [...sharedComponents],
    imports: [],
})
export class CoreModule {}
