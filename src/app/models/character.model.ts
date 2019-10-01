import { Location } from './location.model';
import { Episode } from './episode.model';
import { ObjectUrl } from './objectUrl.model';
import { Type } from '@angular/core';

export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: ObjectUrl;
    location: ObjectUrl;
    image: string;
    episode: string[];
    url: string;
    created: string;
}