import { Component, Input, OnInit } from '@angular/core';
import { Quote } from '../../models/quote.model';

@Component({
  selector: 'app-quote-popular-list',
  templateUrl: './quote-popular-list.component.html',
  styleUrls: ['./quote-popular-list.component.scss'],
})
export class QuotePopularListComponent implements OnInit {
  @Input() quotes: Quote[];

  constructor() {}

  ngOnInit() {}
}
