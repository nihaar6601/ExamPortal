import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewResultComponent } from './review-result.component';

describe('ReviewResultComponent', () => {
  let component: ReviewResultComponent;
  let fixture: ComponentFixture<ReviewResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewResultComponent]
    });
    fixture = TestBed.createComponent(ReviewResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
