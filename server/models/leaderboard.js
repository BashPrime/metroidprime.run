// Initialize database object
var knex = require('../queries');
var bcrypt = require('bcrypt');

module.exports = {
  tableName: 'records',
  selectableColumns: ['id', 'categoryid', 'playerid', 'realtime', 'gametime', 'comment', 'videourl', 'submitted', 'submitter'],
  
  getLeaderboards(params = undefined, done) {
    var queryBuilder = knex.select({
      id: 'records.id',
      subcategoryid: 'records.subcategoryid',
      subcategory: 'subcategories.name',
      category: 'categories.name',
      game: 'games.name',
      playerid: 'records.playerid',
      player: 'playerusers.displayname',
      realtime: 'records.realtime',
      gametime: 'records.gametime',
      comment: 'records.comment',
      videourl: 'records.videourl',
      submitted: 'records.submitted',
      submitterid: 'records.submitterid',
      submitter: 'submitusers.displayname'
    })
    .from(this.tableName)
    queryBuilder.where('records.hidden', false)
    .andWhere('records.rejected', false)
    .leftJoin('subcategories', 'records.subcategoryid', 'subcategories.id')
    .leftJoin('categories', 'subcategories.parentid', 'categories.id')
    .leftJoin('games', 'categories.gameid', 'games.id')
    .leftJoin('users as playerusers', 'records.playerid', 'playerusers.id')
    .leftJoin('users as submitusers', 'records.submitterid', 'submitusers.id');

    var allowedParams = ['id', 'categoryid', 'playerid'];
    var queryKeys = Object.keys(params).filter(function (e) { return this.indexOf(e) > -1; }, allowedParams);

    for (var i = 0; i < queryKeys.length; i++) {
      let queryParam = queryKeys[i];
      if (i === 0) {
        queryBuilder.where('records.' + queryParam, 'in', params[queryParam]);
      } else {
        queryBuilder.orWhere('records.' + queryParam, 'in', params[queryParam]);
      }
    }

    if (params.orderBy) {
      const splitOrderBy = params.orderBy.split(' ');
      queryBuilder.orderBy(splitOrderBy[0], splitOrderBy[1]);
    }

    if (params.limit) {
      queryBuilder.limit(params.limit);
    }

    queryBuilder.then(users => done(null, users))
    .catch(err => done(err));
  }
};