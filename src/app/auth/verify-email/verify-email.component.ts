import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  verifyForm: FormGroup;
  email = '';
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.verifyForm = this.fb.group({
      code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
  }

  ngOnInit() {
    this.email = this.route.snapshot.queryParams['email'] || '';
  }

  onSubmit() {
    if (this.verifyForm.valid && this.email) {
      this.loading = true;
      this.error = '';
      
      this.authService.verifyEmail(this.email, this.verifyForm.value.code).subscribe({
        next: () => {
          alert('Email vérifié avec succès!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.error = err.error?.message || 'Code incorrect';
          this.loading = false;
        }
      });
    }
  }
}
