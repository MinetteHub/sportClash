import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../service/reservation.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-myhome',
  templateUrl: './myhome.component.html',
  styleUrls: ['./myhome.component.css']
})
export class MyhomeComponent implements OnInit {
   reservations: any[] = [];

  constructor(private reservationService: ReservationService, private router: Router)  {}

  ngOnInit(): void {
    const reservedBy = localStorage.getItem('userId');
    if (!reservedBy) {
      console.error("❌ Aucun ID trouvé dans localStorage");
      return;
    }

    this.reservationService.getReservationsByUser(reservedBy).subscribe({
      next: data => this.reservations = data,
      error: err => console.error("Erreur lors du chargement des réservations", err)
    });
  }
  editReservation(id: string) {
  this.router.navigate(['/update-reservation', id]);
}
  deleteReservation(id: string, quantity: number, equipmentId: string): void {
  if (confirm('Confirmer la suppression de cette réservation ?')) {
    this.reservationService.deleteReservation(id).subscribe({
      next: (response) => {
        // Mettre à jour la liste des réservations localement
        this.reservations = this.reservations.filter(reservation => reservation._id !== id);
        alert('Réservation supprimée avec succès et quantité mise à jour.');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression :', err);
        alert('Erreur lors de la suppression de la réservation.');
      }
    });
  }
}
}