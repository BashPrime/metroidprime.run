var knex = require('../queries');
var fs = require('fs');
var path = require('path');

var dbSchemas = [
  'users.sql',
  'news.sql',
  'games.sql',
  'sections.sql',
  'category_parents.sql',
  'categories.sql',
  'records.sql'
];

var dbData = [
  'games.sql',
  'sections.sql',
  'category_parents.sql',
  'categories.sql'
];

async function initDb() {
  await runQueries(dbSchemas, '../db/schema/');
  await runQueries(dbData, '../db/data/');
  process.exit();
}

async function runQueries(fileArray, dir) {
  for (var i = 0; i < fileArray.length; i++) {
    const filePath = dir + fileArray[i];
    await runQuery(filePath)
    .then(() => {
      console.log("Successfully ran " + filePath);
    })
    .catch(err => {
      console.error("Error running query from file: " + filePath);
      console.error(err);
      process.exit(1);
    });
  }
}

function runQuery(filePath) {
  var sql = fs.readFileSync(path.resolve(__dirname, filePath), 'utf8');
  return knex.raw(sql);
}

initDb();
