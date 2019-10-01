import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/models/location.model';
import { Info } from 'src/app/models/infoPage.model';
import { ApiService } from 'src/app/services/api.service';
import { LocationResponse } from 'src/app/models/locationResponse.model';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
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
        private dataService: DataService,
        private router: Router) { }


    ngOnInit() {
        this.getPagesLocation();
        LocationComponent
    }

    getPagesLocation(url = null) {
        this.$locationCall = this.locationService.getLocationsByPage(url);
        this.locations = this.$locationCall
            .pipe(map(k => k.results));       

        const ttt = this.$locationCall.pipe(
            map(k => k.info)
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


        // // var characterLocationId = value.substring(1, 4);

        // console.log("VALUEEEE 01 ", value[0]);
        // console.log("VALUEEEE 02 ", value[1]);
        // console.log("VALUEEEE 03 ", value[2]);
        // // value = [26,139,202,273];
        // const locationResidentsCall: Observable<LocationResponse> = this.locationService.getPagesLocation(value);
        // // pego todos residents do value
        // this.locations = locationResidentsCall
        //     .pipe(map(k => k.results)); 

        //     // [26,139,202,273]


        // console.log("CONSOLE VALUE AQUII", locationResidentsCall);
        



        // const filesArray = value.SPLIT(", ");


        // console.log("VALUEEEEE SPLIT", filesArray);
        

        // var filesArray = this.locations.residents.split(',');
        
        
    }

    getColor(){
        const n = Math.floor((Math.random() * COLORS.length) + 0);
        return COLORS[n];  
    }

    ngOnDestroy() {}

}