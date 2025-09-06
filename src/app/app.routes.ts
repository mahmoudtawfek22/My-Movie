import { Routes } from '@angular/router';
import { People } from './components/people/people';
import { Movies } from './components/movies/movies';
import { Tv } from './components/tv/tv';
import { MovieDetails } from './components/movie-details/movie-details';
import { SeriesDetails } from './components/series-details/series-details';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/movies/1',
    pathMatch: 'full',
  },
  {
    path: 'movies/:id',
    children: [
      {
        path: '',
        component: Movies,
        data: { renderMode: 'ssr' },
      },
      {
        path: 'movie-details/:id',
        component: MovieDetails,
        data: { renderMode: 'ssr' },
      },
    ],
  },
  {
    path: 'people/:id',
    component: People,
    data: { renderMode: 'ssr' },
  },
  {
    path: 'tv/:id',
    children: [
      {
        path: '',
        component: Tv,
        data: { renderMode: 'ssr' },
      },
      {
        path: 'series-details/:id',
        component: SeriesDetails,
        data: { renderMode: 'ssr' },
      },
    ],
  },
  {
    path: 'about',
    component: People,
    data: { renderMode: 'ssr' },
  },
];
