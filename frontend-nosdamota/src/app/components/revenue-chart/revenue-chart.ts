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
  private chart: Chart | undefined;

  private chartInstance: Chart | null = null;

  ngOnInit(): void {
    this.refreshChart();
  }

  public refreshChart() {
    this.orderService.getGraphData().subscribe(data => {
      if (this.chart) {
        this.chart.destroy();
      }
      this.createChart(data);
    });
  }

  createChart(data: any) {
    const canvas = this.chartCanvas.nativeElement;
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    const colorMap: Record<string, string> = {
      'PENDENTE': '#ffc107',
      'PRODUZINDO': '#0dcaf0',
      'ENTREGUE': '#198754'
    };

    const labels = Object.keys(data);
    const backgroundColors = labels.map(label => colorMap[label] || '#6c757d');

    this.chartInstance = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: 'Faturamento por Status',
          data: Object.values(data),
          backgroundColor: backgroundColors,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }
}