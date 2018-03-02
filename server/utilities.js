function generateConfig() {
    var fs = require('fs-extra');
    var path = require('path');
    try {
        fs.copySync(path.resolve(__dirname,'./resources/example-config.js'), './config.js');
        console.log("Generated config.js in application root directory.");
    } catch (err) {
        console.error(err);
    }
}

function buildWhereClause(obj, logic, prefix = undefined) {
    var where;
    Object.keys(obj).forEach(key => {
      if (obj[key]) {
        var keyFilter = key;
        if (prefix)
          keyFilter = prefix + '.' + key
        const whereIn = key + ' in (${' + keyFilter + ':csv})'
        if (where)
          where += ' ' + logic + ' ' + whereIn;
        else
          where = ' where ' + whereIn;
      }
    });
  
    return where;
  }

module.exports = {
    generateConfig: generateConfig,
    buildWhereClause: buildWhereClause
};