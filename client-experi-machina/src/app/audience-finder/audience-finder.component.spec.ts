import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudienceFinderComponent } from './audience-finder.component';

describe('AudienceFinderComponent', () => {
  let component: AudienceFinderComponent;
  let fixture: ComponentFixture<AudienceFinderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AudienceFinderComponent]
    });
    fixture = TestBed.createComponent(AudienceFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
