import { Component, OnInit } from '@angular/core';
import { EventserviceService, Event } from '../service/eventservice.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-eventsclub',
  templateUrl: './eventsclub.component.html',
  styleUrls: ['./eventsclub.component.css']
})
export class EventsclubComponent implements OnInit {
  events: Event[] = [];
  participantId: string | null = null;
  isLoggedIn = false;
  disabledEvents: Set<string> = new Set(); // Bouton "Participer"
  participatedEvents: Set<string> = new Set(); // Suivi des participations

  constructor(private eventService: EventserviceService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
      const decoded: any = jwtDecode(token);
      this.participantId = decoded.id || decoded._id;
    }

    this.eventService.getEvents().subscribe({
      next: (data) => this.events = data,
      error: (err) => console.error('Erreur lors du chargement des événements :', err)
    });
  }

  participer(eventId: string) {
    if (!this.isLoggedIn) {
      alert('Veuillez vous connecter ou vous inscrire pour participer à cet événement.');
      return;
    }

    console.log('Participer à', eventId, 'par', this.participantId);
    this.disabledEvents.add(eventId);
    this.participatedEvents.add(eventId); // Ajout au suivi des participations
  }

  annuler(eventId: string) {
    if (!this.isLoggedIn) {
      alert('Veuillez vous connecter pour annuler votre participation.');
      return;
    }

    console.log('Annulation de la participation à', eventId);
    this.participatedEvents.delete(eventId);
  }

  isDisabled(eventId: string): boolean {
    return this.disabledEvents.has(eventId);
  }

  isParticipating(eventId: string): boolean {
    return this.participatedEvents.has(eventId);
  }
}
