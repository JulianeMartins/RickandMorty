import { Info } from './infoPage.model';
import { Location } from './location.model';

export class LocationResponse {
  public info: Info;
  public results: Location[] = [];
}