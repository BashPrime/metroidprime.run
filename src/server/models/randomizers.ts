import { getConnection } from '../config/database';
import * as games from './games';
import * as randomizersAuthors from './randomizersAuthors';

const knex = getConnection();

export function getAll() {
  return knex('randomizers')
    .then(async randomizers => {
      for (let randomizer of randomizers) {
        randomizer.game = await games.getOneByIdSync(randomizer.gameid);
        randomizer.authors = await randomizersAuthors.getAllByRandomizerIdSync(randomizer.id);
        delete randomizer.gameid;
      }

      return randomizers;
    });
};

export function getOneById(id: number) {
  return knex('randomizers').where('id', id).first()
    .then(async randomizer => {
      randomizer.game = await games.getOneByIdSync(randomizer.gameid);
      randomizer.authors = await randomizersAuthors.getAllByRandomizerIdSync(randomizer.id);
      delete randomizer.gameid;

      return randomizer;
    });
}

export function getOneByAbbreviation(abbreviation: string) {
  return knex('randomizers').where('abbreviation', abbreviation).first()
    .then(async randomizer => {
      randomizer.game = await games.getOneByIdSync(randomizer.gameid);
      randomizer.authors = await randomizersAuthors.getAllByRandomizerIdSync(randomizer.id);
      delete randomizer.gameid;

      return randomizer;
    })
    .catch(err => {
      return null;
    })
};
