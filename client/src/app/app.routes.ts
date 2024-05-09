import { Routes } from '@angular/router';
import { CountryComponent } from './components/country/country.component';

export const routes: Routes = [
  {
    path: '',
    component: CountryComponent,
  },
  {
    path: 'countryDetails/:id',
    loadComponent: () =>
      import('./components/country-details/country-details.component').then(
        (c) => c.CountryDetailsComponent
      ),
  },
];
