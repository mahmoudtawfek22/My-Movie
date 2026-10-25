import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Every page is rendered on the server per request, with the URL that was
 * actually requested. Redirects declared in `app.routes.ts` ('' and '**' ->
 * /home) are answered by the server as HTTP redirects automatically.
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
