import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  RouterModule,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
  withI18nSupport,
} from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { authInterceptor } from './shared/interceptors/auth-interceptor';
import { NgOptimizedImage } from '@angular/common';
import {
  BrowserAnimationsModule,
  provideAnimations,
  provideNoopAnimations,
} from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withViewTransitions(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      })
    ),
    provideAnimations(),
    provideClientHydration(withEventReplay(), withI18nSupport()),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
  ],
};
