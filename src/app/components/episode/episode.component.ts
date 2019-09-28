import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Episodes } from 'src/app/models/episode.model';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss']
})
export class EpisodeComponent implements OnInit {
  episodes: Episodes;
  erro: any;

  constructor(private episodeService: ApiService) { 
    this.getEpisode();
  }

  ngOnInit() {}

  getEpisode() {
    this.episodeService.getEpisodes().subscribe(
      (data: Episodes) => {
        this.episodes = data; 

        console.log('data recebido: ', data);
        console.log('variavel preencida ', this.episodes);       
    }, (error: any) => {
        this.erro = error;
        console.error('ERRO: ', error);
    });
  }
}
