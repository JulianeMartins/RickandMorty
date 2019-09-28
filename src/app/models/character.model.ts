import { Location } from './location.model';
import { Episodes } from './episode.model';
import { ObjectUrl } from './objectUrl.model';

export class Character {
    public id: number;
    public name: string;
    public status: string;
    public species: string;
    public type: string;
    public gender: string;
    public origin: ObjectUrl;
    public location: ObjectUrl;
    public image: string;
    public episode: Episodes;
    public url: string;
    public created: string;
}