import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  handleLogin() {
    const token = btoa(`${this.loginData.username}:${this.loginData.password}`);
    localStorage.setItem('auth_token', token);

    this.router.navigate(['/pedidos']).then(() => {
      window.location.reload();
    });
  }
}

