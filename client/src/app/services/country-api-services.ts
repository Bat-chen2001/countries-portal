import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICountry } from '../interface/ICountry';

@Injectable({ providedIn: 'root' })
export class CountryApiService {
  private baseUrl = 'https://localhost:7039/api/Country';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<ICountry[]> {
    return this.http
      .get<ICountry[]>(this.baseUrl)
      .pipe(map((countries) => countries.map((country) => ({ ...country }))));
  }

  updateCountries(id: string, country: ICountry): Observable<ICountry> {
    const url = `${this.baseUrl}?id=${id}`;
    return this.http.put<ICountry>(url, country);
  }
}
