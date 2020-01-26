import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IsLoadingModule, IsLoadingPipeModule } from '@service-work/is-loading';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';

const sharedModules = [
  CommonModule,
  HttpClientModule,
  IsLoadingModule,
  IsLoadingPipeModule,
];

const sharedComponents = [LoadingIndicatorComponent];

@NgModule({
  declarations: [...sharedComponents],
  imports: [...sharedModules],
  exports: [...sharedModules, LoadingIndicatorComponent],
})
export class SharedModule {}
