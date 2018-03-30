var knex = require('../queries');
var Utilities = require('../utilities');
var Category = require('./category');

async function getLatestRecords(done) {
  var queryBuilder = knex.select({
    id: 'records.id',
    tagid: 'records.tagid',
    tag: 'category_tags.tag',
    tagname: 'category_tags.name',
    categoryid: 'categories.id',
    category: 'categories.name',
    game: 'games.name',
    timing: 'categories.timing',
    playerid: 'records.playerid',
    player: 'playerusers.displayname',
    realtime: 'records.realtime',
    ingametime: 'records.ingametime',
    escapetime: 'records.escapetime',
    comment: 'records.comment',
    videourl: 'records.videourl',
    date: 'records.date',
    submitted: 'records.submitted',
    submitterid: 'records.submitterid',
  })
  .from('records')
  .where('records.rejected', false)
  .leftJoin('category_tags', 'records.tagid', 'category_tags.id')
  .leftJoin('categories', 'category_tags.categoryid', 'categories.id')
  .leftJoin('games', 'categories.gameid', 'games.id')
  .leftJoin('users as playerusers', 'records.playerid', 'playerusers.id')
  .orderBy('date', 'desc')
  .limit(5)
  .then(runs => {
    console.log(runs);
    return done (null, runs);
  })
  .catch(err => done(err));
}

module.exports = {
  getLatestRecords: getLatestRecords
}