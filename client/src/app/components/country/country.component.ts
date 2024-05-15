import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICountry } from '../../interface/ICountry';
import { CountryApiService } from '../../services/country-api-services';
import * as CountryActions from '../../states/country/country.action';
import * as CountrySelector from '../../states/country/country.selector';
import { AsyncPipe, NgFor } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [
    AsyncPipe,
    NgFor,
    MatTableModule,
    MatSortModule,
    MatIcon,
    MatPaginatorModule,
    MatPaginator,
  ],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss',
})
export class CountryComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  http = inject(HttpClient);

  countryApi = inject(CountryApiService);

  countries$!: Observable<ICountry[]>;

  error$!: Observable<string | null>;

  displayColumns: string[] = [
    'index',
    'name',
    'region',
    'subRegion',
    'capital',
    'population',
    'edit',
  ];

  headersColumns: string[] = [
    '#',
    'Name',
    'Region',
    'SubRegion',
    'Capital',
    'Population',
    'Edit',
  ];

  dataSource: MatTableDataSource<ICountry> = new MatTableDataSource<ICountry>();

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private store: Store<{ cart: { countries: ICountry[] } }>,
    private router: Router
  ) {
    this.store.dispatch(CountryActions.loadCountry());
    this.countries$ = this.store.select(CountrySelector.selectAllCountry);
    this.error$ = this.store.select(CountrySelector.selectCountryError);
    this.countries$.subscribe((countries) => {
      this.dataSource.data = countries;
    });
  }
  navigateToDetails(id: string) {
    this.router.navigate(['/countryDetails', id]);
  }
  
  ngOnInit(): void {}
}
