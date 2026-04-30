import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CustomerService } from '../../services/customer-service';
import { Customer } from '../../models/customer.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.scss',
})
export class CustomerList implements OnInit {

  private service = inject(CustomerService);

  customers = signal<Customer[]>([]);
  newCustomer = signal<Customer>({
    name: '',
    email: '',
    phone: ''
  });
  
  ngOnInit(): void {
    this.service.getCustomers().subscribe( data => this.customers.set(data));
  }

  loadCustomers(): void {
    this.service.getCustomers().subscribe(data => this.customers.set(data));
  }

  save() {
    if (!this.newCustomer().name) {
      alert("Por favor, preencha pelo menos o nome!");
      return;
    }

    this.service.saveCustomer(this.newCustomer()).subscribe({
      next: () => {
        alert('Cliente cadastrado com sucesso!');
        this.newCustomer.set({ name: '', email: '', phone: '' }); // Limpa o form
        this.loadCustomers(); // Atualiza a lista
      },
      error: (err) => console.error('Erro ao salvar cliente:', err)
    });
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
