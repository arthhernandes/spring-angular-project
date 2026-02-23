import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CustomerService } from '../../services/customer-service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.scss',
})
export class CustomerList implements OnInit {

  private service = inject(CustomerService);

  customers = signal<Customer[]>([]);
  
  ngOnInit(): void {
    this.service.getCustomers().subscribe( data => this.customers.set(data));
  }

  delete(id?: number) {
  if (id && confirm('Deseja realmente excluir este cliente?')) {
    this.service.deleteCustomer(id).subscribe({
      next: () => {
        alert('Cliente removido!');
        this.service.getCustomers().subscribe( data => this.customers.set(data));
      },
      error: (err: any) => { 
        console.error('Erro ao excluir:', err);
      }
    });
  }
}
}
