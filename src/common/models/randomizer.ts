import { Game } from './game';
import { RandomizerAuthor } from './randomizerAuthor';

export interface Randomizer {
  id: number,
  name: string;
  repository_url: string;
  download_url: string;
  support_url: string;
  game: Game;
  authors: RandomizerAuthor[];
}
