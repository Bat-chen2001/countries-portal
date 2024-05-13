import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, filter, map } from 'rxjs';
import { ICountry } from '../../interface/ICountry';
import * as CountrySelector from '../../states/country/country.selector';
import * as CountryActions from '../../states/country/country.action';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe, NgFor } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CountryApiService } from '../../services/country-api-services';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-country-details',
  standalone: true,
  imports: [
    AsyncPipe,
    NgFor,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.scss',
})
export class CountryDetailsComponent implements OnInit {
  country$!: Observable<ICountry>;

  countrySubscription: Subscription | undefined;

  formControlNames = ['name', 'region', 'subRegion', 'capital', 'population'];
  paramsId: string = '';
  form!: FormGroup;
  disabled = true;

  isReadOnly(controlName: string): boolean {
    return controlName !== 'population' && controlName !== 'capital';
  }
  isFormDirtyOrInvalid(): boolean {
    return this.form.dirty && this.form.invalid;
  }
  goBack() {
    this.router.navigate(['/']);
  }
  updateFields(): void {
    const updatedCountry: ICountry = {
      ...this.form.value,
      capital: this.form.value.capital.toString()?.split(',') || [''],
      id: this.paramsId,
    };
    console.log(updatedCountry);
    this.api.updateCountries(this.paramsId, updatedCountry).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
    });
  }

  constructor(
    private store: Store<{ cart: { countries: ICountry[] } }>,
    private route: ActivatedRoute,
    private api: CountryApiService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.store.dispatch(CountryActions.loadCountry());
    this.route.params.subscribe((params) => {
      this.paramsId = params['id'];
      this.country$ = this.store.select(CountrySelector.selectAllCountry).pipe(
        map((countries) =>
          countries.find((country) => country.id === this.paramsId)
        ),
        filter((country) => !!country),
        map((country) => country as ICountry)
      );
    });
    this.countrySubscription = this.country$.subscribe((country) => {
      if (country) {
        this.form = this.fb.group({
          name: [country.name, Validators.required],
          region: [country.region, Validators.required],
          subRegion: [country.subRegion, Validators.required],
          capital: [country.capital, Validators.required],
          flag: [country.flag, Validators.required],
          population: [country.population, Validators.required],
        });
      }
    });
  }
  ngOnInit(): void {}
  ngOnDestroy(): void {
    if (this.countrySubscription) {
      this.countrySubscription.unsubscribe();
    }
  }
}
