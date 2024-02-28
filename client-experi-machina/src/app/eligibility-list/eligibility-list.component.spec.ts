import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EligibilityListComponent } from './eligibility-list.component';

describe('EligibilityListComponent', () => {
  let component: EligibilityListComponent;
  let fixture: ComponentFixture<EligibilityListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EligibilityListComponent]
    });
    fixture = TestBed.createComponent(EligibilityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
