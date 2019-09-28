import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants';
import { LocationResponse } from '../models/locationResponse.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlBase = API_URL;
  private urlLocation = `${this.urlBase}location/`;

  private urlCharacter = `${this.urlBase}character/`

  pageNumber: number = 1;
  i: number;

  constructor(private http: HttpClient) { }

  // public getLocation(): Observable<any> {
  //   return this.http.get(this.urlLocation);
  // }

  public getPagesLocation(url): Observable<LocationResponse> {

    let firstUrl = this.urlLocation;
    return this.http.get<LocationResponse>(url || firstUrl);
  }

  public getResidentsLocation(value): Observable<Location> {
    return this.http.get<Location>(`this.urlLocation + ${value}`);
  }


  public getEpisodes(): Observable<any> {
    return this.http.get(`https://rickandmortyapi.com/api/episode`);
  }

  public getCharacters(): Observable<any> {
    return this.http.get(`https://rickandmortyapi.com/api/character`);
  }
}
