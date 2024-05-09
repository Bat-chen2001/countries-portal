import { createAction, props } from '@ngrx/store';
import { ICountry } from '../../interface/ICountry';

export const loadCountry = createAction('[Country Component] loadCountry');
export const loadCountrySuccess = createAction(
  '[Country Component] loadCountrySuccess',
  props<{ countries: ICountry[] }>()
);
export const loadCountryFailed = createAction(
  '[Country Component] loadCountryFailed',
  props<{ errorMessage: string }>()
);
