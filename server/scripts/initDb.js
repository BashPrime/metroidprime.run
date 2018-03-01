var db = require('../queries');
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

// runQuery(0, dbSchemas, '../db/schema/', true);
runQuery(0, dbData, '../db/data/', true);

function runQuery(index, dbArray, dir, terminate = false) {
  if (index >= dbArray.length) {
    if (terminate) {
      process.exit();
    }
    return;
  }

  var sqlFile = dbArray[index];
  var sql = fs.readFileSync(path.resolve(__dirname, dir + sqlFile), 'utf8');

  db.none(sql)
    .then(function () {
      console.log("Successfully ran query from file: " + sqlFile);
      return runQuery(index + 1, dbArray, dir, terminate);
    })
    .catch(function (err) {
      console.error("Error running query from file: " + sqlFile);
      throw err;
    });
}
