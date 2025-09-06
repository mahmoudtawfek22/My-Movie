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
      },
      {
        path: 'movie-details/:id',
        component: MovieDetails,
      },
    ],
  },
  {
    path: 'people/:id',
    component: People,
  },
  {
    path: 'tv/:id',
    children: [
      {
        path: '',
        component: Tv,
      },
      {
        path: 'series-details/:id',
        component: SeriesDetails,
      },
    ],
  },
  {
    path: 'about',
    component: People,
  },
];
