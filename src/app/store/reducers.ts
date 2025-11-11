import { createReducer, on } from '@ngrx/store';
import { AI } from '../shared/models/aiSearch';
import { storeSearch } from './actions';

const intialState: any = null;

export const aiReducer = createReducer(
  intialState,
  on(storeSearch, (state, action) => action.ai)
);
