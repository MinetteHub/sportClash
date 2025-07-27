import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../auth-styles.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.error = '';
      
      const { email, password } = this.loginForm.value;
      
      this.authService.login(email, password).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Erreur connexion complète:', err);
          console.error('Status:', err.status);
          console.error('Error object:', err.error);
          
          if (err.status === 0) {
            this.error = 'Impossible de contacter le serveur. Vérifiez que le backend est démarré.';
          } else if (err.status === 401) {
            this.error = 'Email ou mot de passe incorrect';
          } else if (err.status === 400) {
            this.error = err.error?.message || 'Données invalides';
          } else if (err.status === 500) {
            this.error = 'Erreur serveur';
          } else {
            this.error = `Erreur ${err.status}: ${err.error?.message || 'Erreur de connexion'}`;
          }
          
          this.loading = false;
        }
      });
    }
  }
}
