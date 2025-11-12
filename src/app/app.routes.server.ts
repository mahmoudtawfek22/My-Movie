import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Server,
  },
  {
    path: 'home',
    renderMode: RenderMode.Server,
  },
  {
    path: 'home/movie-details/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'home/series-details/:id',
    renderMode: RenderMode.Server,
  },
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
    path: 'ai',
    renderMode: RenderMode.Server,
  },
  {
    path: 'ai/movie-details/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'about',
    renderMode: RenderMode.Prerender,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];

// export const serverRoutes: ServerRoute[] = [
//   {
//     path: '',
//     renderMode: RenderMode.Server,
//   },
//   {
//     path: 'movies/:id',

//     renderMode: RenderMode.Server,
//   },
//   {
//     path: 'home',

//     renderMode: RenderMode.Server,
//   },
//   {
//     path: 'movies/:id/movie-details/:id',
//     renderMode: RenderMode.Server,
//   },

//   {
//     path: 'people/:id',
//     renderMode: RenderMode.Server,
//   },
//   {
//     path: 'tv/:id',
//     renderMode: RenderMode.Server,
//   },
//   {
//     path: 'tv/:id/series-details/:id',
//     renderMode: RenderMode.Server,
//   },
//   {
//     path: 'about',
//     renderMode: RenderMode.Prerender,
//   },
//   {
//     path: 'home/movie-details/:id',
//     renderMode: RenderMode.Server,
//   },
//   {
//     path: 'home/series-details/:id',
//     renderMode: RenderMode.Server,
//   },
//   {
//     path: 'ai',
//     renderMode: RenderMode.Server,
//   },
//   {
//     path: 'ai/movie-details/:id',
//     renderMode: RenderMode.Server,
//   },
//   {
//     path: '**',
//     renderMode: RenderMode.Prerender,
//   },
// ];
