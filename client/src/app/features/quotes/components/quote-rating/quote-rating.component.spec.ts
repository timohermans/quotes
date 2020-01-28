import { QuoteRatingComponent } from './quote-rating.component';
import { take } from 'rxjs/operators';
import { faStar } from '@fortawesome/free-regular-svg-icons/faStar';
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons/faStar';
import DoneCallback = jest.DoneCallback;

describe('QuoteRatingComponent', () => {
  const openStar = faStar;

  it('marks every rating before as hovered', () => {
    // arrange
    const component = new QuoteRatingComponent();
    // act
    component.hoverOn(2);
    // assert
    expect(component.ratingsMarked).toEqual([1, 2, 3]);
  });

  it('marks every rating hovered (and before) as a full star', () => {
    // arrange
    const component = new QuoteRatingComponent();

    // act
    component.hoverOn(2);

    // assert
    expect(component.isSelected(1)).toBeTruthy();
    expect(component.isSelected(2)).toBeTruthy();
    expect(component.isSelected(3)).toBeTruthy();
    expect(component.isSelected(4)).toBeFalsy();
    expect(component.isSelected(5)).toBeFalsy();
    expect(component.getIconFor(1)).toEqual(fullStar);
    expect(component.getIconFor(2)).toEqual(fullStar);
    expect(component.getIconFor(3)).toEqual(fullStar);
    expect(component.getIconFor(4)).toEqual(openStar);
    expect(component.getIconFor(5)).toEqual(openStar);
  });

  it('has all open stars when leaving the star container', () => {
    // arrange
    const component = new QuoteRatingComponent();
    component.hoverOn(2);

    // act
    component.removeSelectedRatings();

    // assert
    expect(component.ratingHoveredOn).toBeNull();
    expect(component.isSelected(1)).toBeFalsy();
    expect(component.isSelected(2)).toBeFalsy();
    expect(component.isSelected(3)).toBeFalsy();
    expect(component.isSelected(4)).toBeFalsy();
    expect(component.isSelected(5)).toBeFalsy();
  });

  it('determines which rating is actually hovered on', () => {
    // arrange
    const component = new QuoteRatingComponent();

    // act
    component.hoverOn(2);

    // assert
    expect(component.isHoveredOn(1)).toBeFalsy();
    expect(component.isHoveredOn(2)).toBeFalsy();
    expect(component.isHoveredOn(3)).toBeTruthy();
    expect(component.isHoveredOn(4)).toBeFalsy();
    expect(component.isHoveredOn(5)).toBeFalsy();
  });

  it('marks ratings as selected when clicked on', () => {
    // arrange
    const component = new QuoteRatingComponent();

    // act
    component.selectRating(2);

    // assert
    expect(component.ratingSelected).toEqual(2);
    expect(component.isHoveredOn(2)).toBeFalsy();
    expect(component.isSelected(2)).toBeTruthy();
  });

  it('does not mark anything when a rating is selected', () => {
    // arrange
    const component = new QuoteRatingComponent();
    component.ratingSelected = 3;

    // act
    component.hoverOn(4);

    // assert
    expect(component.isHoveredOn(1)).toBeFalsy();
    expect(component.isHoveredOn(2)).toBeFalsy();
    expect(component.isHoveredOn(3)).toBeFalsy();
    expect(component.isHoveredOn(4)).toBeFalsy();
    expect(component.isHoveredOn(5)).toBeFalsy();
  });

  it('is not possible to select a rating above 5', () => {
    // arrange
    const component = new QuoteRatingComponent();
    component.ratingSelected = 10;

    // act
    component.ngOnChanges({
      ratingSelected: {
        currentValue: 10,
      },
    } as any);

    // assert
    expect(component.ratingSelected).toEqual(5);
  });

  it('is possible to set the selected rating from the outside', () => {
    // arrange
    const component = new QuoteRatingComponent();
    component.ratingSelected = 3;

    // act
    component.ngOnChanges({
      ratingSelected: {
        currentValue: 3,
      },
    } as any);

    // assert
    expect(component.isHoveredOn(3)).toBeFalsy();
    expect(component.getIconFor(1)).toEqual(fullStar);
    expect(component.getIconFor(2)).toEqual(fullStar);
    expect(component.getIconFor(3)).toEqual(fullStar);
    expect(component.getIconFor(4)).toEqual(openStar);
    expect(component.getIconFor(5)).toEqual(openStar);
  });

  it('when a rating is selected, leaving the container does not remove the ratings', () => {
    // arrange
    const component = new QuoteRatingComponent();
    component.ratingSelected = 3;
    component.ngOnChanges({
      ratingSelected: {
        currentValue: 3,
      },
    } as any);

    // act
    component.removeSelectedRatings();

    // assert
    expect(component.getIconFor(1)).toEqual(fullStar);
    expect(component.getIconFor(2)).toEqual(fullStar);
    expect(component.getIconFor(3)).toEqual(fullStar);
  });

  it('when a rating is selected, emit a rating event', (done: DoneCallback) => {
    const expectedRating = 2;
    const component = new QuoteRatingComponent();
    component.ratingSelect.pipe(take(1)).subscribe((ratingSelected: number) => {
      expect(ratingSelected).toBe(2);
      done();
    });

    component.selectRating(expectedRating);
  });
});
