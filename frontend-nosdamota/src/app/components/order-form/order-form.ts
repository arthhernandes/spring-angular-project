import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../models/customer.model';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product-service';
import { CustomerService } from '../../services/customer-service';
import { OrderService } from '../../services/order-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-form.html',
  styleUrl: './order-form.scss',
})
export class OrderForm implements OnInit {

  customers = signal<Customer[]>([]);
  products = signal<Product[]>([]);

  selectedCustomerId = signal<number | null>(null);
  selectedProducts = signal<Product[]>([]);

  total = computed(() => {
    return this.selectedProducts().reduce((sum, product) => sum + (product.price || 0), 0);
  });

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(data => this.customers.set(data));
    this.productService.getProducts().subscribe(data => this.products.set(data));
  }

  toggleProduct(product: Product): void {
    this.selectedProducts.update(current => {
      const exists = current.find(p => p.id === product.id);
      if (exists) {
        return current.filter(p => p.id !== product.id);
      } else {
        return [...current, product];
      }
    });
  }

  save() {
    if (!this.selectedCustomerId() || this.selectedProducts().length === 0) {
      alert('Selecione um cliente e ao menos uma peça de crochê! 🧶');
      return;
    }

    const newOrder = {
      customer: { id: this.selectedCustomerId() },
      product: this.selectedProducts().map(p => ({ id: p.id })),
      description: "Pedido personalizado - Nós da Mota",
      price: this.total(),
      date: new Date().toISOString(),
      status: "PENDENTE"
    };

    this.orderService.saveOrder(newOrder).subscribe({
      next: () => {
        alert('Salvo com sucesso! ✅');
        this.router.navigate(['/pedidos']);
      },
      error: (err) => {
        console.error('ERRO DETECTADO:', err);
        if (err.status === 401 || err.status === 403) {
          alert('Sua sessão expirou ou o banco resetou! Faça login novamente. 🔒');
          localStorage.removeItem('auth_token');
          this.router.navigate(['/login']);
        } else {
          alert('Erro técnico: ' + err.message);
        }
      }
    });
  }
}
