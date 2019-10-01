import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Episode } from 'src/app/models/episode.model';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Character } from 'src/app/models/character.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss']
})
export class EpisodeComponent implements OnInit {
  erro: any;
  characterId: string;
  $characterCall: Observable<Character>;
  $episodes: Observable<Episode[]>;

  constructor(private episodeService: ApiService,
              private route: ActivatedRoute) { 
  }

  ngOnInit() {
    this.characterId = this.route.snapshot.paramMap.get("id");
    this.getEpisodeInfo();
  }

  private getEpisodeInfo() {
    this.$characterCall = this.episodeService.getCharacter(this.characterId);
    
    const $episodesId = this.$characterCall.pipe(
      map(character => character.episode),
      map(arrayUrlEpisode => this.getArrayOfIds(arrayUrlEpisode))
    );

    $episodesId.subscribe((data:number[])=>{
      const episodesId = data;
      this.getEpisodesCharacter(episodesId);
    })
  }

  private getIds(urlEpisode) {
    return +urlEpisode.split('/')[5];
  }

  private getArrayOfIds(arrayUrlEpisode): number[]{
    return arrayUrlEpisode.map(urlEpisode => this.getIds(urlEpisode));
  }

  getEpisodesCharacter(episodesId: number[]) {
    this.$episodes = !episodesId.length
    ? of([])
    : this.episodeService.getEpisodes(episodesId)
  }

}
