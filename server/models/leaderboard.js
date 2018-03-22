// Initialize database object
var knex = require('../queries');
var bcrypt = require('bcrypt');

module.exports = {
  tableName: 'records',
  selectableColumns: ['id', 'categoryid', 'playerid', 'realtime', 'gametime', 'comment', 'videourl', 'submitted', 'submitter'],
  
  getLeaderboards(params = undefined, done) {
    var queryBuilder = knex.select({
      id: 'records.id',
      categoryid: 'records.categoryid',
      categoryName: 'categories.name',
      categoryParent: 'category_parents.name',
      game: 'games.name',
      playerid: 'records.playerid',
      player: 'users.displayname',
      realtime: 'records.realtime',
      gametime: 'records.gametime',
      comment: 'records.comment',
      videourl: 'records.videourl',
      submitted: 'records.submitted',
      submitterid: 'records.submitterid',
      submitter: 'users.displayname'
    })
    .from({records: this.tableName, users: 'users', categories: 'categories', category_parents: 'category_parents', games: 'games'})
    queryBuilder.where('records.hidden', false)
    .andWhereRaw('?? = ??', ['records.categoryid', 'categories.id'])
    .andWhereRaw('?? = ??', ['categories.parentid', 'category_parents.id'])
    .andWhereRaw('?? = ??', ['category_parents.gameid', 'games.id'])
    .andWhereRaw('?? = ??', ['records.playerid', 'users.id'])
    .andWhereRaw('?? = ??', ['records.submitterid', 'users.id']);

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