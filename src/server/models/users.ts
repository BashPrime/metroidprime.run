import * as bcrypt from 'bcrypt';
import { getConnection } from "../config/database";

const knex = getConnection();
const columns = [
  'id',
  'name',
  'displayname'
];

export function getAll() {
  return knex.column(columns).select().from('users');
};

export function getOneById(id: number) {
  return knex.column(columns).select().from('users').where('id', id).first();
};

export function getOneByNameAllColumns(name: string) {
  return knex('users').where('name', name).first();
}

export async function getOneByIdSync(id: number) {
  return await knex.column(columns).select().from('users').where('id', id).first();
};

export function getOneByName(name: string) {
  return knex.column(columns).select().from('users').where('name', name).first();
}

export function create(userName: string, password: string, email: string) {
  const saltRounds = 10;

  // Hash password with bcrypt before storing in database
  return bcrypt.hash(password, saltRounds)
  .then(hash => {
    return knex('users').insert({
      displayname: userName,
      name: userName.toLowerCase(),
      password: hash,
      email: email
    });
  });
}
