import { Routes } from '@angular/router';
import { People } from './components/people/people';
import { Movies } from './components/movies/movies';
import { Tv } from './components/tv/tv';
import { MovieDetails } from './components/movie-details/movie-details';
import { SeriesDetails } from './components/series-details/series-details';
import { Home } from './components/home/home';
import { About } from './components/about/about';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },

  {
    path: 'home',
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: 'movie-details/:id',
        loadComponent: () =>
          import('./components/movie-details/movie-details').then(
            (m) => m.MovieDetails
          ),
      },
      {
        path: 'series-details/:id',
        loadComponent: () =>
          import('./components/series-details/series-details').then(
            (m) => m.SeriesDetails
          ),
      },
    ],
  },
  {
    path: 'movies/:id',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/movies/movies').then((m) => m.Movies),
      },
      {
        path: 'movie-details/:id',
        loadComponent: () =>
          import('./components/movie-details/movie-details').then(
            (m) => m.MovieDetails
          ),
      },
    ],
  },
  {
    path: 'people/:id',
    loadComponent: () =>
      import('./components/people/people').then((m) => m.People),
  },
  {
    path: 'tv/:id',
    children: [
      {
        path: '',
        loadComponent: () => import('./components/tv/tv').then((m) => m.Tv),
      },
      {
        path: 'series-details/:id',
        loadComponent: () =>
          import('./components/series-details/series-details').then(
            (m) => m.SeriesDetails
          ),
      },
    ],
  },

  {
    path: 'about',
    loadComponent: () =>
      import('./components/about/about').then((m) => m.About),
  },
  {
    path: 'ai',
    loadComponent: () =>
      import('./components/ai-search/ai-search').then((m) => m.AiSearch),
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
