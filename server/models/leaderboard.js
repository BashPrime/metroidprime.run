// Initialize database object
var knex = require('../queries');
var Utilities = require('../utilities');
var bcrypt = require('bcrypt');

module.exports = {
  tableName: 'records',
  selectableColumns: ['id', 'categoryid', 'playerid', 'realtime', 'gametime', 'comment', 'videourl', 'submitted', 'submitter'],

  getLeaderboards(params = undefined, done) {
    var minTimes = knex.select(['playerid', 'tagid'])
      .min('gametime as mingametime')
      .from('records')
      .groupBy(['playerid', 'tagid'])
      .as('min_times');

    var queryBuilder = knex.select({
      id: 'records.id',
      tagid: 'records.tagid',
      tagname: 'category_tags.name',
      categoryid: 'categories.id',
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
    .whereRaw('records.gametime = min_times.mingametime')
    .andWhereRaw('records.tagid = min_times.tagid')
    .andWhere('records.hidden', false)
    .andWhere('records.rejected', false)
    .leftJoin('category_tags', 'records.tagid', 'category_tags.id')
    .leftJoin('categories', 'category_tags.categoryid', 'categories.id')
    .leftJoin('games', 'categories.gameid', 'games.id')
    .leftJoin('users as playerusers', 'records.playerid', 'playerusers.id')
    .leftJoin('users as submitusers', 'records.submitterid', 'submitusers.id');

    const allowedParams = {
      id: 'records.id',
      tagid: 'category_tags.id',
      tag: 'category_tags.tag',
      game: 'games.label',
      playerid: 'records.playerid',
      submitterid: 'records.submitterid'
    };

    queryBulder = Utilities.handleQueryParams(params, allowedParams, queryBuilder)
    .innerJoin(minTimes, 'min_times.playerid', 'records.playerid');

    queryBuilder.then(users => {
      const sortedUsers = Utilities.sortAndRankRecords(users, "gametime");
      return done(null, sortedUsers);
    })
    .catch(err => done(err));
  }
};
