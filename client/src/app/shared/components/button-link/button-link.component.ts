import { Component } from '@angular/core';

@Component({
  selector: 'app-button-link',
  template: `
    <button class="button is-text is-small">
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./button-link.component.scss'],
})
export class ButtonLinkComponent {}
