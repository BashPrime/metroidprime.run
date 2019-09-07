import { getConnection } from "../config/database";

const knex = getConnection();

export function getAll() {
    return knex('games').orderBy('order');
};

export function getOneById(id: number) {
  return knex('games').where('id', id).first();
};

export async function getOneByIdSync(id: number) {
  return await knex('games').where('id', id).first();
};

export function getOneByAbbreviation(abbreviation: string) {
    return knex('games').where('abbreviation', abbreviation).first();
}
