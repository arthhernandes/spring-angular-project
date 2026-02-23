import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { CustomerList } from './components/customer-list/customer-list';
import { CustomerForm } from './components/customer-form/customer-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, CustomerList, CustomerForm],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
}
