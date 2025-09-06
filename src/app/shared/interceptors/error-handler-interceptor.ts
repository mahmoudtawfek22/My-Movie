import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errMessage = '';
      if (error.error instanceof ErrorEvent) {
        errMessage = error.message;
      }
      return throwError(() => new Error(errMessage));
    })
  );
};
