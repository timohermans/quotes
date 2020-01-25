import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-indicator',
  template: `
    <p>
      loading-indicator works!
    </p>
  `,
  styleUrls: ['./loading-indicator.component.scss'],
})
export class LoadingIndicatorComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
