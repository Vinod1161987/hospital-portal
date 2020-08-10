import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientQueueListComponent } from './patient-queue-list.component';

describe('PatientQueueListComponent', () => {
  let component: PatientQueueListComponent;
  let fixture: ComponentFixture<PatientQueueListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientQueueListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientQueueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
