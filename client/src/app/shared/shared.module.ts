import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IsLoadingModule, IsLoadingPipeModule } from '@service-work/is-loading';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { ButtonLinkComponent } from './components/button-link/button-link.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const sharedModules = [
  CommonModule,
  HttpClientModule,
  IsLoadingModule,
  IsLoadingPipeModule,
  FontAwesomeModule,
];

const sharedComponents = [LoadingIndicatorComponent, ButtonLinkComponent];

@NgModule({
  declarations: [...sharedComponents],
  imports: [...sharedModules],
  exports: [...sharedModules, ...sharedComponents],
})
export class SharedModule {}
