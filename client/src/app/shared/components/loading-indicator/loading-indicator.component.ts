import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-indicator',
  template: `
    <div [class.loaded]="('default' | swIsLoading | async) === false">
      <div id="loader-wrapper">
        <div id="loader"></div>

        <div class="loader-section section-left"></div>
        <div class="loader-section section-right"></div>
      </div>
    </div>
  `,
  styleUrls: ['./loading-indicator.component.scss'],
})
export class LoadingIndicatorComponent {
  constructor() {}
}
