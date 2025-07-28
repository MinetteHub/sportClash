import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Equipment {
  _id: string;
  name: String,
  description: String,
  quantity: Number,
  available: Number,
  eventId: String,
   
}

@Injectable({
  providedIn: 'root'
})
export class EquipmentsService {

  private apiUrl = 'http://localhost:3000/equipment/showequipments'; 

  constructor(private http: HttpClient) {}

  getEquipments(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(this.apiUrl);
  }
}
