import { createReducer, on } from '@ngrx/store';
import * as CountryActions from './country.action';
import { ICountry } from '../../interface/ICountry';

export interface CountryState {
  countries: ICountry[];
  error: string | null;
}

export const initialCountryState: CountryState = {
  countries: [],
  error: null,
};

export const countryReducer = createReducer(
  initialCountryState,
  on(CountryActions.loadCountrySuccess, (state, { countries }) => ({
    ...state,
    countries,
    error: null,
  })),
  on(CountryActions.loadCountryFailed, (state, { errorMessage }) => ({
    ...state,
    error: errorMessage,
  }))
);
