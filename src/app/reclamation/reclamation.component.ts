import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {
  reclamationForm: FormGroup;
  loading = false;
  error = '';
  success = '';
  currentUser: any;
  reclamations: any[] = [];
  showForm = false;

  private apiUrl = 'http://localhost:3000/reclamation';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.reclamationForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^[A-Za-z]/)]],
      sujet: ['', Validators.required],
      description: ['', Validators.required],
      status: ['en_attente']
    });
  }

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.reclamationForm.patchValue({
          username: user.username
        });
        this.loadUserReclamations();
      }
    });
  }

  loadUserReclamations() {
    this.http.get<any[]>(`${this.apiUrl}/showusersnames/${this.currentUser.username}`).subscribe({
      next: (data) => {
        this.reclamations = data;
      },
      error: (err) => {
        console.error('Erreur chargement réclamations:', err);
      }
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onSubmit() {
    if (this.reclamationForm.valid) {
      this.loading = true;
      this.error = '';
      this.success = '';
      
      this.http.post(`${this.apiUrl}/add`, this.reclamationForm.value).subscribe({
        next: (response) => {
          this.success = 'Réclamation envoyée avec succès!';
          this.reclamationForm.reset();
          this.reclamationForm.patchValue({
            username: this.currentUser.username,
            status: 'en_attente'
          });
          this.loading = false;
          this.showForm = false;
          this.loadUserReclamations();
        },
        error: (err) => {
          this.error = err.error?.message || 'Erreur lors de l\'envoi';
          this.loading = false;
        }
      });
    }
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'en_attente': return 'bg-warning text-dark';
      case 'resolu': return 'bg-success';
      case 'rejete': return 'bg-danger';
      case 'en_cours': return 'bg-info';
      default: return 'bg-secondary';
    }
  }

  getStatusText(status: string): string {
    switch(status) {
      case 'en_attente': return '⏳ En attente';
      case 'resolu': return '✅ Résolu';
      case 'rejete': return '❌ Rejeté';
      case 'en_cours': return '🔄 En cours';
      default: return status;
    }
  }
}
