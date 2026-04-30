import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);
  private readonly login_url = `${environment.API_URL}/api/users/login`;
  
  login(loginData: { username: string; password: string }): Observable<any> {
  return this.http.post<any>(this.login_url, loginData).pipe(
    tap(res => {
      if (res && res.token) {
        localStorage.setItem('auth_token', res.token);
      }
    })
  );
  }

  logout() {
    localStorage.removeItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }


}
