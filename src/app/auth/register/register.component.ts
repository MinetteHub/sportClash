import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../auth-styles.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern(/^[A-Za-z]/)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[A-Za-z]/)]],
      username: ['', [Validators.required, Validators.pattern(/^[A-Za-z]/)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      adresse: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)/)]],
      role: ['participant']
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.loading = true;
      this.error = '';
      
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          alert('Inscription réussie! Un email de confirmation a été envoyé.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Erreur inscription complète:', err);
          console.error('Status:', err.status);
          console.error('Message:', err.message);
          console.error('Error object:', err.error);
          
          if (err.status === 0) {
            this.error = 'Impossible de contacter le serveur. Vérifiez que le backend est démarré sur le port 3001.';
          } else if (err.status === 400) {
            this.error = err.error?.message || 'Données invalides';
          } else if (err.status === 500) {
            this.error = 'Erreur serveur: ' + (err.error?.message || 'Erreur interne');
          } else {
            this.error = `Erreur ${err.status}: ${err.error?.message || err.message || 'Erreur inconnue'}`;
          }
          
          this.loading = false;
        }
      });
    }
  }
}
