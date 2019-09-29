import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants';
import { LocationResponse } from '../models/locationResponse.model';
import { Location } from '../models/location.model';
import { Character } from '../models/character.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlBase = API_URL;
  private urlLocation = `${this.urlBase}location/`;
  private urlCharacter = `${this.urlBase}character/`;

  pageNumber: number = 1;
  i: number;

  constructor(private http: HttpClient) { }

  public getLocationsByPage(url): Observable<LocationResponse> {
    let firstUrl = this.urlLocation;
    return this.http.get<LocationResponse>(url || firstUrl);
  }


  public getLocation(locationId): Observable<Location> {
    return this.http.get<Location>(`${this.urlLocation}/${locationId}`)
    .pipe(
      tap(
        characters => console.log(`fetched characters`, characters),
        error => console.log(`error -> ${error}`)
      ));
  }

  public getCharacters(charactersId): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.urlCharacter}/${charactersId}`)
    .pipe(
      tap(
        characters => console.log(`fetched characters`, characters),
        error => console.log(`error -> ${error}`)
      ));
  }

  public getEpisodes(): Observable<any> {
    return this.http.get(`https://rickandmortyapi.com/api/episode`);
  }

  
}
