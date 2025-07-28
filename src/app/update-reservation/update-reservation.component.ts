import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../service/reservation.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-reservation',
  templateUrl: './update-reservation.component.html',
  styleUrls: ['./update-reservation.component.css']
})
export class UpdateReservationComponent implements OnInit {
  reservationForm!: FormGroup;
  reservationId!: string;

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reservationId = this.route.snapshot.params['id'];
    console.log("ID récupéré : ", this.reservationId);

    // Initialisation d'un FormGroup vide
    this.reservationForm = this.fb.group({
      equipmentId: [''],
      eventId: [''],
      reservedBy: [''],
      quantity: [''],
      reservationDate: [''],
      status: ['']
    });

    this.reservationService.getReservationById(this.reservationId).subscribe(data => {
      console.log("Données reçues de l'API : ", data);

      // Mise à jour du FormGroup avec les données de l'API
      this.reservationForm.patchValue({
        equipmentId: data.equipmentId,
        eventId: data.eventId,
        reservedBy: data.reservedBy,
        quantity: data.quantity,
        reservationDate: data.reservationDate?.split('T')[0],
        status: data.status,
      });
    });
  }

  onSubmit(): void {
    console.log("Données du formulaire avant soumission : ", this.reservationForm.value);

    this.reservationService.updateReservation(this.reservationId, this.reservationForm.value).subscribe(() => {
      console.log("Réservation mise à jour !");
      this.router.navigate(['/myhome']);
    });
  }
}
