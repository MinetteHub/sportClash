import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



export interface Event {
  _id?: string;
  name: string;
  date: string;
  location: string;
  latitude: number;
  longitude: number;
  organizerId: string;
  participantId: string;
  participation: boolean;
  categoryId: string;
  maxParticipants: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventserviceService {

  private apiUrl = 'http://localhost:3000/event/showEvents'; 

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }
  
}
