import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Character } from 'src/app/models/character.model';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  characters: Character[];
  erro: any;
  locationId: string;
  
  constructor(
    private characterService: ApiService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.locationId = this.route.snapshot.paramMap.get("id");
  }

  getCharacter() {
    this.characterService.getCharacters().subscribe(
      (data: Character) => {
        // this.characters = data;
        console.log('data recebido: ', data);
        console.log('variavel preenchida ', this.characters);
      }, (error: any) => {
        this.erro = error;
        console.log('ERRO ', error);
      });
  }
}
