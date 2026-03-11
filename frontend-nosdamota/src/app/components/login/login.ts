import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {

  loginData = {
    username: '',
    password: ''
  };

  errorMessage: string = '';
  sessionExpired: boolean = false;

  private authService = inject(AuthService);
  private router = inject(Router); 
  private route = inject(ActivatedRoute)

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['expired']) {
        this.sessionExpired = true;
      }
    });
  }

  handleLogin() {
    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/pedidos']);
      },
      error: (err) => {
        this.sessionExpired = false;
        this.errorMessage = "Usuário ou senha inválidos!";
      }
    });
  }
}

