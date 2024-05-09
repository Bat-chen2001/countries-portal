import { CountryState } from './country.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectCountryFeature = createFeatureSelector<CountryState>('country');

export const selectAllCountry = createSelector(
  selectCountryFeature,
  (state: CountryState) => state.countries
);

export const selectCountryError = createSelector(
  selectCountryFeature,
  (state: CountryState) => state.error
);
