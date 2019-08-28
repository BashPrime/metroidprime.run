import { getConnection } from "../config/database";

const knex = getConnection();

export function getAll() {
    return knex('news');
};

export function getOneBySlug(slug: string) {
    return knex('news').where('slug', slug).first();
}

export function getOneById(id: number) {
    return knex('news').where('id', id).first();
}