import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReservationService } from '../service/reservation.service';

@Component({
  selector: 'app-ajout-reservation',
  templateUrl: './ajout-reservation.component.html',
  styleUrls: ['./ajout-reservation.component.css']
})
export class AjoutReservationComponent implements OnInit {
  reservationForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const equipmentId = this.route.snapshot.queryParamMap.get('equipmentId');
    const userId = localStorage.getItem('userId');

    if (!userId) {
      alert("Vous devez être connecté pour réserver.");
      this.router.navigate(['/equipments']);
      return;
    }

    this.reservationForm = new FormGroup({
      equipmentId: new FormControl(equipmentId || '', Validators.required),
      eventId: new FormControl('', Validators.required),
      reservedBy: new FormControl(userId, Validators.required),
      quantity: new FormControl('', [Validators.required, Validators.min(1)]),
      reservationDate: new FormControl('', Validators.required),
      status: new FormControl('PENDING', Validators.required)
    });

    console.log('Form initialized with:', this.reservationForm.value);
  }

  addReservation() {
    console.log('Données du formulaire:', this.reservationForm.value);

    this.reservationService.postReservation(this.reservationForm.value).subscribe({
      next: () => {
        alert('Réservation réussie!');
        this.router.navigate(['/equipments']);
      },
      error: (err) => {
        console.error('Erreur:', err);
        alert('Erreur lors de la réservation');
      }
    });
  }
}
