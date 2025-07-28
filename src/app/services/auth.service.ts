import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
  _id: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromToken();
  }

  register(userData: any): Observable<any> {
    console.log('Données envoyées:', userData);
    console.log('URL appelée:', `${this.apiUrl}/add`);
    return this.http.post(`${this.apiUrl}/add`, userData);
  }

  verifyEmail(email: string, code: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify`, { email, code });
  }

  login(email: string, password: string): Observable<any> {
    console.log('Tentative de connexion:', { email, password: '***' });
    console.log('URL appelée:', `${this.apiUrl}/login`);
    
    return this.http.post(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response: any) => {
          console.log('Réponse connexion:', response);
          localStorage.setItem('token', response.token);
          this.loadUserFromToken();
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  private loadUserFromToken(): void {
    if (this.isLoggedIn()) {
      const token = localStorage.getItem('token')!;
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.http.get<User>(`${this.apiUrl}/showusers/${payload.id}`).subscribe(
        user => this.currentUserSubject.next(user),
        () => this.logout()
      );
    }
  }
}