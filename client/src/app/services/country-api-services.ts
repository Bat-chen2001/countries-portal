import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ICountry } from '../interface/ICountry';

@Injectable({ providedIn: 'root' })
export class CountryApiService {
  http = inject(HttpClient);

  constructor() {}

  getCountries() {
    return this.http.get<ICountry[]>('https://localhost:7039/api/Country').pipe(
      map((countries: ICountry[]) => {
        return countries.map((country: ICountry) => {
          return { ...country };
        });
      })
    );
  }

  updateCountries(id: string, country: ICountry): Observable<ICountry> {
    const url = `https://localhost:7039/api/Country?id=${id}`;
    return this.http.put<ICountry>(url, country);
  }
}
