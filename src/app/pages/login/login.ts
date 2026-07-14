import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  nombre = '';
  error = '';
  loading = false;
  isRegister = false;

  constructor(private api: ApiService, private router: Router) {}

  submit() {
    if (this.loading) return;
    this.error = '';
    this.loading = true;

    if (this.isRegister) {
      this.api.register(this.email, this.password, this.nombre).subscribe({
        next: () => {
          this.api.login(this.email, this.password).subscribe({
            next: (res) => {
              localStorage.setItem('token', res.access_token);
              this.router.navigate(['/dashboard']);
            },
            error: () => { this.error = 'Error al iniciar sesión'; this.loading = false; }
          });
        },
        error: (e) => { this.error = e.error?.detail || 'Error al registrarse'; this.loading = false; }
      });
    } else {
      this.api.login(this.email, this.password).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.access_token);
          this.router.navigate(['/dashboard']);
        },
        error: () => { this.error = 'Credenciales incorrectas'; this.loading = false; }
      });
    }
  }
}