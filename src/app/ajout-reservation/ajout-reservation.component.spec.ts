import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutReservationComponent } from './ajout-reservation.component';

describe('AjoutReservationComponent', () => {
  let component: AjoutReservationComponent;
  let fixture: ComponentFixture<AjoutReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutReservationComponent]
    });
    fixture = TestBed.createComponent(AjoutReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
