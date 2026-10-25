import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { storeSearch } from './actions';
import { map, tap } from 'rxjs';

@Injectable()
export class SearchEffects {
  private actions$ = inject(Actions);
  constructor() {}
  saveResponse = createEffect(
    () =>
      this.actions$.pipe(
        ofType(storeSearch),
        map((action) => action.ai.movies),
        tap((action) => {
          console.log(action);
        })
      ),
    { dispatch: false }
  );
}
