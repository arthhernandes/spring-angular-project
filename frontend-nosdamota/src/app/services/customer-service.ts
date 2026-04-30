import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.API_URL}/api/customer`;

  getCustomers(): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.apiUrl);
  }

  saveCustomer(customer: Customer): Observable<Customer> { 
    return this.http.post<Customer>(this.apiUrl, customer);
  }

  deleteCustomer(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text'});
  }
  
}
