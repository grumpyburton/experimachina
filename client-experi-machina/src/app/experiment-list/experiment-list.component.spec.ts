import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentListComponent } from './experiment-list.component';

describe('ExperimentListComponent', () => {
  let component: ExperimentListComponent;
  let fixture: ComponentFixture<ExperimentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExperimentListComponent]
    });
    fixture = TestBed.createComponent(ExperimentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
