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

function handleQueryParams(params, allowedParams, queryBuilder) {
  var queryKeys = Object.keys(params).filter(function (e) { return this.indexOf(e) > -1; }, Object.keys(allowedParams));
  for (var i = 0; i < queryKeys.length; i++) {
    let queryParam = queryKeys[i];
    if (i === 0) {
      queryBuilder.where(allowedParams[queryParam], 'in', params[queryParam]);
    } else {
      queryBuilder.andWhere(allowedParams[queryParam], 'in', params[queryParam]);
    }
  }

  if (params.orderBy) {
    const splitOrderBy = params.orderBy.split(' ');
    queryBuilder.orderBy(splitOrderBy[0], splitOrderBy[1]);
  }

  if (params.limit) {
    queryBuilder.limit(params.limit);
  }

  return queryBuilder;
}

function sortAndRankRecords(records, sortField) {
  var sortedRecords = records.sort(function(a, b) {
    if (a[sortField] < b[sortField])
      return -1;
    if (a[sortField] > b[sortField])
      return 1;
    return 0;
  });

  for (var i = 0; i < sortedRecords.length; i++) {
    sortedRecords[i].rank = i + 1;
  }

  return sortedRecords;
}

module.exports = {
    generateConfig: generateConfig,
    handleQueryParams: handleQueryParams,
    sortAndRankRecords: sortAndRankRecords
};
