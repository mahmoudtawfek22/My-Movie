import { Routes } from '@angular/router';

const loadMovieDetails = () =>
  import('./components/movie-details/movie-details').then(
    (m) => m.MovieDetails
  );

const loadSeriesDetails = () =>
  import('./components/series-details/series-details').then(
    (m) => m.SeriesDetails
  );

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
        loadComponent: () =>
          import('./components/home/home').then((m) => m.Home),
      },
      { path: 'movie-details/:id', loadComponent: loadMovieDetails },
      { path: 'series-details/:id', loadComponent: loadSeriesDetails },
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
      { path: 'movie-details/:id', loadComponent: loadMovieDetails },
    ],
  },
  {
    path: 'tv/:id',
    children: [
      {
        path: '',
        loadComponent: () => import('./components/tv/tv').then((m) => m.Tv),
      },
      { path: 'series-details/:id', loadComponent: loadSeriesDetails },
    ],
  },
  {
    path: 'people/:id',
    loadComponent: () =>
      import('./components/people/people').then((m) => m.People),
  },
  {
    path: 'ai',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/ai-search/ai-search').then((m) => m.AiSearch),
      },
      { path: 'movie-details/:id', loadComponent: loadMovieDetails },
    ],
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./components/about/about').then((m) => m.About),
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];
