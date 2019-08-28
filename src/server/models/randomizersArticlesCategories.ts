import { getConnection } from "../config/database";

const knex = getConnection();

export function getAll() {
    return knex('randomizers_articles_categories');
};

export function getOneById(id: number) {
  return knex('randomizers_articles_categories').where('id', id).first();
};

export async function getOneByIdSync(id: number) {
  return await knex('randomizers_articles_categories').where('id', id).first();
};
