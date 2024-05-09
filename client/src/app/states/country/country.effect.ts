import { Injectable } from '@angular/core';
import { switchMap, map, catchError, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CountryActions from './country.action';
import { CountryApiService } from '../../services/country-api-services';

@Injectable()
export class CountryEffect {
  constructor(private api: CountryApiService, private actions$: Actions) {}

  loadCountries$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CountryActions.loadCountry),
      switchMap(() =>
        this.api.getCountries().pipe(
          map((res) => CountryActions.loadCountrySuccess({ countries: res })),
          catchError((error: { message: string }) =>
            of(
              CountryActions.loadCountryFailed({
                errorMessage: error.message + ': fail to load countries',
              })
            )
          )
        )
      )
    );
  });
}
