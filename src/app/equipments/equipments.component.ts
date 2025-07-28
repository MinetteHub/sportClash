import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Importer Router
import { EquipmentsService, Equipment } from '../service/equipments.service';
import { ReservationService } from '../service/reservation.service';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css']
})
export class EquipmentsComponent implements OnInit {
  equipments: Equipment[] = [];

  constructor(
    private equipmentService: EquipmentsService,
    private router: Router // Injecter Router
  ) {}

  ngOnInit(): void {
    this.equipmentService.getEquipments().subscribe({
      next: (data) => this.equipments = data,
      error: (err) => console.error('Erreur lors du chargement des équipements :', err)
    });
  }

  openReservationForm(equipmentId: string) {
    const userId = localStorage.getItem('userId'); 
    
    if (userId) {
      this.router.navigate(['/ajout-reservation'], { queryParams: { equipmentId } });
    } else {
      alert('Vous devez vous connecter pour effectuer une réservation.');
    }
  }
}
