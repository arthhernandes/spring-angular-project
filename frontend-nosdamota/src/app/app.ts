import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
}
