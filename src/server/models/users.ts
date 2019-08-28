import { getConnection } from "../config/database";

const knex = getConnection();
const columns = [
  'id',
  'name',
  'displayname',
  'enabled'
];

export function getAll() {
    return knex.column(columns).select().from('users');
};

export function getOneById(id: number) {
  return knex.column(columns).select().from('users').where('id', id).first();
};

export async function getOneByIdSync(id: number) {
  return await knex.column(columns).select().from('users').where('id', id).first();
};

export function getOneByName(name: string) {
    return knex.column(columns).select().from('users').where('name', name).first();
}
