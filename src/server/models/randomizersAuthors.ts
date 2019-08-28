import { getConnection } from '../config/database';

const knex = getConnection();

export function getAll() {
  return knex('randomizers_authors');
};

export function getAllByRandomizerId(randomizerId: number) {
  return knex('randomizers_authors').where('randomizerid', randomizerId);
};

export async function getAllByRandomizerIdSync(randomizerId: number) {
  return await knex('randomizers_authors').where('randomizerid', randomizerId);
};
