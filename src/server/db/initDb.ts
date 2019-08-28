import * as fs from 'fs';
import * as path from 'path';

import { getConnection } from '../config/database';

const connection = getConnection();

const dbSchemas = [
    'users.sql',
    'news.sql',
    'games.sql',
    'randomizers.sql',
    'randomizers_articles_categories.sql',
    'randomizers_articles.sql',
    'randomizers_authors.sql'
];

const dbData = [
    'games.sql',
    'randomizers.sql',
    'randomizers_articles_categories.sql',
    'randomizers_authors.sql'
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
    return connection.raw(sql);
}

initDb();
