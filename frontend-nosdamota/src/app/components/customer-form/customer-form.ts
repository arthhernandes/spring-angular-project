import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer-service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.scss',
})
export class CustomerForm {

  private service = inject(CustomerService);

  customer = signal<Customer>(
    { 
      name: '', 
      email: '', 
      phone: '' 
    });

  save(){
    this.service.saveCustomer(this.customer()).subscribe({
      next: () => {
        alert('Customer saved successfully!');
        window.location.reload();
      },
      error: (err) => console.error('Error saving customer:', err)
    });
  }

}
