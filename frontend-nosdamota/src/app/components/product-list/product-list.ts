import { Component, OnInit, signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product-service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CurrencyPipe, CommonModule, FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit {

  products = signal<Product[]>([]);

  newProduct = signal<Product>({ 
    name: '', 
    description: '', 
    price: 0, 
    productionTime: 0 
  });

  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.service.getProducts().subscribe(data => 
      this.products.set(data));
  }

  save() {
    this.service.saveProduct(this.newProduct()).subscribe({
      next: () => {
        alert('Produto cadastrado no catálogo!');
        this.newProduct.set({ name: '', description: '', price: 0, productionTime: 0 });
        this.loadProducts(); 
      },
      error: (err) => console.error('Erro ao salvar produto:', err)
    });
  }

  delete(id?: number): void {
    if (id && confirm('Are you sure you want to delete this product?')) {
      this.service.deleteProduct(id).subscribe({
        next: () => {
          alert('Product deleted!');
          this.products.update(list => list.filter(p => p.id !== id));
        }
      });
    }
  }

}
