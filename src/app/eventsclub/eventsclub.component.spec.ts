import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsclubComponent } from './eventsclub.component';

describe('EventsclubComponent', () => {
  let component: EventsclubComponent;
  let fixture: ComponentFixture<EventsclubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventsclubComponent]
    });
    fixture = TestBed.createComponent(EventsclubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
