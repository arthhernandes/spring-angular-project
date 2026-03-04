import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../services/order-service';
import { Chart, registerables } from 'chart.js/auto';

Chart.register(...registerables);

@Component({
  selector: 'app-revenue-chart',
  standalone: true,
  imports: [],
  template: '<canvas #revenueChart></canvas>',
  styles: [`canvas { max-height: 300px; }`],
})
export class RevenueChart implements OnInit {

  @ViewChild('revenueChart') chartCanvas!: ElementRef;
  private orderService = inject(OrderService);

  ngOnInit(): void {
    this.orderService.getGraphData().subscribe(data => {
      this.createChart(data);
    });
  }

  createChart(data: any) {
    new Chart(this.chartCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: Object.keys(data),
        datasets: [{
          label: 'Faturamento por Status',
          data: Object.values(data),
          backgroundColor: ['#ffc107', '#0dcaf0', '#198754'],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });

  }
}
