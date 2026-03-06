import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order-service';
import { FormsModule } from '@angular/forms';
import { RevenueChart } from '../revenue-chart/revenue-chart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe, FormsModule, RevenueChart],
  templateUrl: './order-list.html',
  styleUrl: './order-list.scss',
})
export class OrderList implements OnInit {

  orders = signal<Order[]>([]);
  searchTerm = signal<string>('');
  stats = signal({ totalRevenue: 0, pendingOrders: 0 });

  filteredOrders = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.orders();

    return this.orders().filter(order =>
      order.customerName.toLowerCase().includes(term)
    );
  });

  totalFilteredValue = computed(() => {
    return this.filteredOrders().reduce((sum, order) => sum + order.price, 0);
  });

  constructor(
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.loadOrders();
    this.loadStats();
  }

  loadStats() {
  this.orderService.getStats().subscribe({
    next: (data) => this.stats.set(data),
    error: (err) => {
      console.error('Erro ao buscar estatísticas', err);
      this.handleAuthError(err); 
    }
  });
}

  loadOrders() {
  this.orderService.getOrders().subscribe({
    next: (data) => this.orders.set(data),
    error: (err) => {
      console.error('Erro ao buscar pedidos', err);
      this.handleAuthError(err);
    }
  });
}

  updateStatus(order: Order, newStatus: string) {
    order.status = newStatus;

    this.orderService.saveOrder(order).subscribe({
      next: () => {
        console.log(`Pedido ${order.id} agora está ${newStatus}`);
        this.refresh();
      },
      error: (err) => console.error('Erro ao atualizar status:', err)
    });
  }

  deleteOrder(order: Order) {
    if (order.id && confirm(`Tem certeza que deseja excluir o pedido #${order.id}?`)) {
      this.orderService.deleteOrder(order.id).subscribe({
        next: () => {
          console.log(`Pedido ${order.id} excluído com sucesso`);
          this.refresh();
        },
        error: (err) => {
          console.error('Erro ao excluir:', err);
          alert('Erro ao excluir o pedido no servidor.');
        }
      });
    }
  }

  private handleAuthError(err: any) {
  if (err.status === 401) {
    console.warn('Sessão inválida ou banco resetado. Redirecionando...');
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }
}

}
