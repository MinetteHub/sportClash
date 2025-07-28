import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  // URL de base de ton API backend
  private apiUrl = 'http://localhost:3000/reservation';  // Assure-toi que l'URL de base est correcte

  constructor(private http: HttpClient) {}

 getReservationsByUser(reservedBy: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/showreservations/userid/${reservedBy}`);
  }
getReservationById(id: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/showreservations/id/${id}`);
}

updateReservation(id: string, reservationData: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/update/${id}`, reservationData);
}
deleteReservation(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  // Méthode pour ajouter une réservation
  postReservation(reservationData: { 
    equipmentId: string; 
    eventId: string; 
    reservedBy: string; 
    quantity: number; 
    reservationDate: string; 
    status: string; 
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, reservationData);
  }
}
