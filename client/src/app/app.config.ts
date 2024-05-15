import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { countryReducer } from './states/country/country.reducer';
import { CountryEffect } from './states/country/country.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(),
    provideEffects(CountryEffect),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideState({ name: 'country', reducer: countryReducer }),
  ],
};
