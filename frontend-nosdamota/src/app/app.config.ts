import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { CustomerList } from './components/customer-list/customer-list';
import { ProductList } from './components/product-list/product-list';
import { OrderList } from './components/order-list/order-list';
import { OrderForm } from './components/order-form/order-form';

const routes: Routes = [
  { path: 'clientes', component: CustomerList },
  { path: 'produtos', component: ProductList },
  { path: 'pedidos', component: OrderList },
  { path: 'novo-pedido', component: OrderForm },
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes)
  ]
};
