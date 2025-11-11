import { createAction, props } from '@ngrx/store';
import { AI } from '../shared/models/aiSearch';

export const storeSearch = createAction('storeSearch', props<{ ai: AI }>());
