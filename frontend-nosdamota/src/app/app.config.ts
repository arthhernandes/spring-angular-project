import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { CustomerList } from './components/customer-list/customer-list';
import { ProductList } from './components/product-list/product-list';
import { OrderList } from './components/order-list/order-list';
import { OrderForm } from './components/order-form/order-form';
import { authInterceptor } from './auth-interceptor';
import { Login } from './components/login/login';
import { authGuard } from './guards/auth-guard';

const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'clientes', component: CustomerList, canActivate: [authGuard] },
  { path: 'produtos', component: ProductList, canActivate: [authGuard] },
  { path: 'pedidos', component: OrderList, canActivate: [authGuard] },
  { path: 'novo-pedido', component: OrderForm, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])
    )
  ]
};
