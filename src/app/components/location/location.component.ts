import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Character } from 'src/app/models/character.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Location } from 'src/app/models/location.model';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})

export class LocationComponent implements OnInit {
  erro: any;
  locationId: string;
  $locationCall: Observable<Location>;
  $charactersCall: Observable<Character>;
  location: Location;
  residents: Character[];
  charactersId: number[];
  $characters: Observable<Character[]>;
  
  constructor(
    private route: ActivatedRoute,
    private locationService: ApiService,
    private router: Router) { }

  ngOnInit() {
    this.locationId = this.route.snapshot.paramMap.get("id");
    this.getLocationInfo();
  }

  private getLocationInfo() {
    this.$locationCall = this.locationService.getLocation(this.locationId);

    const $charactersId = this.$locationCall.pipe(
      map(location => location.residents),
      map(arrayUrlCharacter => this.getArrayOfIds(arrayUrlCharacter))
    );

    $charactersId.subscribe((data:number[])=>{
      const charactersId = data;
      this.getCharactersLocation(charactersId);
    })
  }

  private getIds(urlCharacter) {
    return +urlCharacter.split('/')[5];
  }

  private getArrayOfIds(arrayUrlCharacter): number[]{
    return arrayUrlCharacter.map(urlCharacter => this.getIds(urlCharacter));
  }

  getCharactersLocation(charactersId: number[]) {
    this.$characters = !charactersId.length
    ? of([])
    : this.locationService.getCharacters(charactersId)
  }

  getCharacter(characterId) {
    this.router.navigate(['/characters',characterId]);
  }
}