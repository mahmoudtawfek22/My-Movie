import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, inject, PLATFORM_ID, signal } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { Header } from './components/header/header';
import { BrowserModule } from '@angular/platform-browser';
import { Footer } from './shared/components/footer/footer';
import { filter } from 'rxjs';
import { log } from 'console';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Mymovie');
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object,
    private route: ActivatedRoute
  ) {}
}
