import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { faStar } from '@fortawesome/free-regular-svg-icons/faStar';
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import { QuoteService } from '../../services/quote.service';

@Component({
  selector: 'app-quote-rating',
  template: `
    <div
      class="ratings is-flex are-center-aligned"
      (mouseleave)="removeSelectedRatings()"
    >
      <fa-icon
        *ngFor="let rating of ratings; let index = index"
        class="rating"
        [class.is-hovered]="isHoveredOn(rating)"
        [icon]="getIconFor(rating)"
        (mouseenter)="hoverOn(index)"
        (click)="selectRating(rating)"
      >
      </fa-icon>
      <fa-icon
        *ngIf="loadingKeyForRating | swIsLoading | async"
        class="has-horizontal-margin"
        [icon]="spinner"
        [spin]="true"
      ></fa-icon>
    </div>
  `,
  styleUrls: ['./quote-rating.component.scss'],
})
export class QuoteRatingComponent implements OnInit, OnChanges {
  @Input() ratingSelected?: number = null;
  @Output() ratingSelect = new EventEmitter<number>();

  public ratings = [1, 2, 3, 4, 5];
  public ratingsMarked: number[] = [];
  public ratingHoveredOn?: number = null;
  public openStar = faStar;
  public fullStar = fullStar;
  public spinner = faCircleNotch;
  public loadingKeyForRating = QuoteService.loadingKeyForRating;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.ratingSelected && changes.ratingSelected.currentValue) {
      const currentValue = changes.ratingSelected.currentValue;
      this.selectRating(currentValue > 5 ? 5 : currentValue);
    }
  }

  public hoverOn(indexHovered: number): void {
    if (this.ratingSelected != null) {
      return;
    }

    this.ratingHoveredOn = this.ratings[indexHovered];
    this.ratingsMarked = this.ratings.slice(0, indexHovered + 1);
  }

  public isSelected(rating: number): boolean {
    return !!this.ratingsMarked.find(
      ratingSelected => ratingSelected === rating
    );
  }

  public getIconFor(rating: number) {
    return this.isSelected(rating) ? this.fullStar : this.openStar;
  }

  public removeSelectedRatings(): void {
    if (this.ratingSelected != null) {
      return;
    }

    this.ratingHoveredOn = null;
    this.ratingsMarked = [];
  }

  public isHoveredOn(rating: number): boolean {
    return this.ratingHoveredOn === rating;
  }

  public selectRating(rating: number): void {
    this.ratingSelected = null;
    this.hoverOn(this.ratings.indexOf(rating));
    this.ratingSelected = rating;
    this.ratingHoveredOn = null;
    this.ratingSelect.emit(rating);
  }
}
