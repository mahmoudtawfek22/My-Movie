import { RenderMode, ServerRoute } from '@angular/ssr';
import { People } from './components/people/people';
import { Movies } from './components/movies/movies';
import { Tv } from './components/tv/tv';
import { MovieDetails } from './components/movie-details/movie-details';
import { SeriesDetails } from './components/series-details/series-details';
export const serverRoutes: ServerRoute[] = [
  {
    path: 'movies/:id',

    renderMode: RenderMode.Server,
  },
  {
    path: 'movies/:id/movie-details/:id',
    renderMode: RenderMode.Server,
  },

  {
    path: 'people/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'tv/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'tv/:id/series-details/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'about',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
