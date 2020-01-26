import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  template: `
    <nav class="navbar has-background-light">
      <div class="is-size-1">
        <span class="has-text-danger">Q</span>uotes<span class="has-text-danger"
          >.</span
        >
      </div>
    </nav>
  `,
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
