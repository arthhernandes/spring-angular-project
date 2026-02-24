import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../models/customer.model';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product-service';
import { CustomerService } from '../../services/customer-service';
import { OrderService } from '../../services/order-service';

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
  selectedProductIds = signal<Product[]>([]);

  constructor(private customerService: CustomerService, private productService: ProductService, private orderService: OrderService) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(data => this.customers.set(data));
    this.productService.getProducts().subscribe(data => this.products.set(data));
  }

  toggleProduct(product: Product): void {
    this.selectedProductIds.update(current => {
      const exists = current.find(p => p.id === product.id);
      if (exists) {
        return current.filter(p => p.id !== product.id);
      } else {
        return [...current, product];
      }
    });
  }

  get total(): number {
    return this.selectedProductIds().reduce((sum, product) => sum + product.price, 0);
  }

  save() {
  const newOrder = {
    customer: { id: this.selectedCustomerId() },
    product: this.selectedProductIds(), 
    description: "Pedido personalizado",
    price: this.total,
  };

  this.orderService.saveOrder(newOrder).subscribe({
    next: () => {
      alert('Pedido do "Nós da Mota" salvo com sucesso!');
      this.selectedCustomerId.set(null);
      this.selectedProductIds.set([]);
    },
    error: (err) => console.error('Erro ao salvar pedido:', err)
  });  
}

}
