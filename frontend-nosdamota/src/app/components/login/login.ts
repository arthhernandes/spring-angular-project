import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  loginData = {
    username: '',
    password: ''
  };

  errorMessage: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  handleLogin() {
    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/pedidos']);
      },
      error: (err) => {
        this.errorMessage = "Usuário ou senha inválidos!";
      }
    });
  }
}

