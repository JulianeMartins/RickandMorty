import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Character } from 'src/app/models/character.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {
  characterId: string;
  $characterCall: Observable<Character>;
  characterInfo: Character;
  erro: any;

  constructor(
    private route: ActivatedRoute,
    private characterService: ApiService) { }

  ngOnInit() {
    this.characterId = this.route.snapshot.paramMap.get("id");
    this.getCharacter();
  }

  getCharacter() {
    this.$characterCall = this.characterService.getCharacter(this.characterId);
  //   const character = this.$characterCall
  // .subscribe(
  //     (data: Character) => {
  //         this.characterInfo = data;
  //     }, (error: any) => {
  //         this.erro = error;
  //     }
  // );
  //   console.log("CHARACTER",character);

  }
}
