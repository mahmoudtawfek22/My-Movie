import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let request = req.clone({
    withCredentials: false,
    setHeaders: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWRkMWMxNjczODVhMjZjOGZmMDY2YjQ1ODQ5Y2E4YyIsIm5iZiI6MTc1NjI4MjY4Mi4xMzc5OTk4LCJzdWIiOiI2OGFlYmYzYTdlOTk2ZTRiYzY1NmI2NTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.O_a5THhgs0hBIBbH0WGflZcaA6JRuj03lLM1VVF7W4I',
    },
  });
  return next(request);
};
