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

runQuery('../db/schema/', dbSchemas, 0, (result) => {
  runQuery('../db/data/', dbData, 0, (result) => {
    process.exit();
  });
});

function runQuery(dir, array, index, done) {
  if (index >= array.length) {
    return done(true);
  }

  var sqlFile = array[index];
  var sql = fs.readFileSync(path.resolve(__dirname, dir + sqlFile), 'utf8');

  knex.raw(sql)
  .then(() => {
    return runQuery(dir, array, index + 1, done);
  })
  .catch(err => {
    console.error("Error running query from file: " + sqlFile);
    throw err;
    process.exit(1);
  })
}
