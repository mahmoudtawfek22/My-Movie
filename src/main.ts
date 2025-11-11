import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideStore } from '@ngrx/store';

bootstrapApplication(App, {
  ...(appConfig as any),
  ngZone: 'noop',
}).catch((err) => console.error(err));
