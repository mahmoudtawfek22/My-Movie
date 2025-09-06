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
        data: { prerender: false },
      },
      {
        path: 'movie-details/:id',
        component: MovieDetails,
        data: { prerender: false },
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
        data: { prerender: false },
      },
      {
        path: 'series-details/:id',
        component: SeriesDetails,
        data: { prerender: false },
      },
    ],
  },
  {
    path: 'about',
    component: People,
    data: { prerender: false },
  },
];
