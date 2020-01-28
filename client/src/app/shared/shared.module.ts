import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IsLoadingModule, IsLoadingPipeModule } from '@service-work/is-loading';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { ButtonLinkComponent } from './components/button-link/button-link.component';

const sharedModules = [
  CommonModule,
  HttpClientModule,
  IsLoadingModule,
  IsLoadingPipeModule,
];

const sharedComponents = [LoadingIndicatorComponent];

@NgModule({
  declarations: [...sharedComponents, ButtonLinkComponent],
  imports: [...sharedModules],
  exports: [...sharedModules, LoadingIndicatorComponent, ButtonLinkComponent],
})
export class SharedModule {}
