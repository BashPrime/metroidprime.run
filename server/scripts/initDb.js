var db = require('../queries');
var fs = require('fs');
var path = require('path');

var sqlFiles = [
  'users.sql',
  'regions.sql',
  'games.sql',
  'categories.sql',
  'records.sql'
];

runQuery(0);

function runQuery(index) {
  if (index >= sqlFiles.length) {
    process.exit();
  }

  var sqlFile = sqlFiles[index];
  var sql = fs.readFileSync(path.resolve(__dirname, '../db/schema/' + sqlFile), 'utf8');

  db.none(sql)
    .then(function () {
      console.log("Successfully ran query from file: " + sqlFile);
      runQuery(index + 1);
    })
    .catch(function (err) {
      console.error("Error running query from file: " + sqlFile);
      throw err;
    });
}
