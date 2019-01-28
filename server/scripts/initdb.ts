import { DbConnector } from '../dbConnector';
import * as fs from 'fs';
import * as path from 'path';

const connector = new DbConnector();

const dbSchemas = [
    'users.sql',
    'roles.sql',
    'permissions.sql',
    'roles_permissions.sql',
    'users_roles.sql',
    'news.sql',
    'games.sql',
    'moderators_games.sql',
    'games_articles_categories.sql',
    'games_articles.sql',
    'categories.sql',
    'records.sql',
    'tags.sql',
    'records_tags.sql'
];

const dbData = [
    'games.sql',
    'games_articles_categories.sql',
    'categories.sql',
    'tags.sql',
    'roles.sql',
    'permissions.sql',
    'roles_permissions.sql'
];

async function initDb() {
    await runQueries(dbSchemas, '../db/schema/');
    await runQueries(dbData, '../db/data/');
    process.exit();
}

async function runQueries(fileArray, dir) {
    for (let i = 0; i < fileArray.length; i++) {
        const filePath = dir + fileArray[i];
        try {
            await runQuery(filePath);
            console.log('Successfully ran ' + filePath);
        } catch (err) {
            console.error('Error running query from file: ' + filePath);
            console.error(err);
            process.exit(1);
        }
    }
}

function runQuery(filePath) {
    const sql = fs.readFileSync(path.resolve(__dirname, filePath), 'utf8');
    return connector.knex.raw(sql);
}

initDb();
