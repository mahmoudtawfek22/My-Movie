import { createFeatureSelector } from '@ngrx/store';
import { AI } from '../shared/models/aiSearch';

export const aiSelector = createFeatureSelector<AI>('aiReducer');
