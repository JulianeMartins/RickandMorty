import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/models/location.model';
import { Info } from 'src/app/models/infoPage.model';
import { ApiService } from 'src/app/services/api.service';
import { LocationResponse } from 'src/app/models/locationResponse.model';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocationComponent } from '../location/location.component';
import { COLORS } from 'src/app/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  locations: Observable<Location[]>;
  residentsLocation: Observable<Location[]>;
  paginationInfo: Info;
  location: number;
  locationInfo: Location;
  $locationCall: Observable<LocationResponse>;
  locationCharacters: string[];
  erro: any;

  constructor(
    private locationService: ApiService,
    private router: Router) { }

  ngOnInit() {
    this.getPagesLocation();
    LocationComponent
  }

  getPagesLocation(url = null) {
    this.$locationCall = this.locationService.getLocationsByPage(url);
    this.locations = this.$locationCall
      .pipe(map(location => location.results));       

    this.$locationCall.pipe(
      map(location => location.info)
    )
    .subscribe(
      (data: Info) => {
        this.paginationInfo = data;
      }, (error: any) => {
        this.erro = error;
      }
    );
  }

  getLocation(locationId:number) {
    this.router.navigate(['/locations',locationId]);  
  }

  getColor() {
    const color = Math.floor((Math.random() * COLORS.length) + 0);
    return COLORS[color];  
  }
}