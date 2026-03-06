import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private loggedIn = false;

  login(username: string, password: string) {

    const token = btoa(`${username}:${password}`);
    localStorage.setItem('auth_token', token);
    this.loggedIn = true;
  }
  
  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  } 

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  
}
