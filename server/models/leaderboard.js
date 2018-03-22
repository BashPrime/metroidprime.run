// Initialize database object
var knex = require('../queries');
var Utilities = require('../utilities');
var bcrypt = require('bcrypt');

module.exports = {
  tableName: 'records',
  selectableColumns: ['id', 'categoryid', 'playerid', 'realtime', 'gametime', 'comment', 'videourl', 'submitted', 'submitter'],
  
  getLeaderboards(params = undefined, done) {
    var queryBuilder = knex.select({
      id: 'records.id',
      subcategoryid: 'records.subcategoryid',
      subcategory: 'subcategories.name',
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
    .where('records.hidden', false)
    .andWhere('records.rejected', false)
    .leftJoin('subcategories', 'records.subcategoryid', 'subcategories.id')
    .leftJoin('categories', 'subcategories.parentid', 'categories.id')
    .leftJoin('games', 'categories.gameid', 'games.id')
    .leftJoin('users as playerusers', 'records.playerid', 'playerusers.id')
    .leftJoin('users as submitusers', 'records.submitterid', 'submitusers.id');

    const allowedParams = {
      id: 'records.id',
      categoryid: 'categories.id',
      category: 'categories.label',
      game: 'games.label',
      subcategoryid: 'subcategories.id',
      subcategory: 'subcategories.label',
      playerid: 'records.playerid',
      submitterid: 'records.submitterid'
    };

    queryBulder = Utilities.handleQueryParams(params, allowedParams, queryBuilder);
    
    queryBuilder.then(users => done(null, users))
    .catch(err => done(err));
  }
};