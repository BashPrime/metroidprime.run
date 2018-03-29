var knex = require('../queries');
var Utilities = require('../utilities');
var Category = require('./category');

async function getLeaderboardsByCategory(categoryId, done) {
  try {
    const category = await Category.getCategoryByIdSync(categoryId);
    if (category) {
      var minTimes = knex.select(['playerid', 'tagid'])
      .min(category.timing + ' as mingametime')
      .from('records')
      .groupBy(['playerid', 'tagid'])
      .as('min_times');

      var queryBuilder = knex.select({
        id: 'records.id',
        tagid: 'records.tagid',
        tagname: 'category_tags.name',
        categoryid: 'categories.id',
        category: 'categories.name',
        playerid: 'records.playerid',
        player: 'playerusers.displayname',
        realtime: 'records.realtime',
        ingametime: 'records.ingametime',
        escapetime: 'records.escapetime',
        comment: 'records.comment',
        videourl: 'records.videourl',
        submitted: 'records.submitted',
        submitterid: 'records.submitterid',
        submitter: 'submitusers.displayname'
      })
      .from(this.tableName)
      .innerJoin(minTimes, 'min_times.playerid', 'records.playerid')
      .whereRaw('records.' + category.timing + ' = min_times.mingametime');
      
      if (category.defaulttag) {
        queryBuilder.andWhere('records.tagid', category.defaulttag);
      }

      queryBuilder.andWhere('records.hidden', false)
      .andWhere('records.rejected', false)
      .andWhere('records.categoryid', categoryId)
      .leftJoin('category_tags', 'records.tagid', 'category_tags.id')
      .leftJoin('categories', 'category_tags.categoryid', 'categories.id')
      .leftJoin('users as playerusers', 'records.playerid', 'playerusers.id')
      .leftJoin('users as submitusers', 'records.submitterid', 'submitusers.id')
      .orderBy(category.timing, 'asc')
      .then(leaderboards => {
        const rankedRecords = Utilities.rankRecords(leaderboards, category.timing);
        return done(null, rankedRecords);
      })
      .catch(err => done(err));
    } else {
      return done(null, []);
    }
  } catch (err) {
    const errorMsg = new Error('Error getting category information');
    console.error(errorMsg.message + ': ' + err);
    return done(errorMsg);
  }
}

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
    .innerJoin(minTimes, 'min_times.playerid', 'records.playerid')
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

    queryBulder = Utilities.handleQueryParams(params, allowedParams, queryBuilder);

    queryBuilder.then(users => {
      this.getTagByParams(params, (err, tag) => {
        if (err) {
          return done(err);
        }
        console.log("Sorting by " + tag.rankby);
        const sortedUsers = Utilities.sortAndRankRecords(users, tag.rankby);
        return done(null, sortedUsers);
      });
    })
    .catch(err => done(err));
  },

  getLeaderboardsByCategory: getLeaderboardsByCategory,

  getTagByParams(params, done) {
    var queryBuilder = knex.select('*')
    .from('category_tags')
    .leftJoin('categories','category_tags.categoryid', 'categories.id')
    .leftJoin('games', 'categories.gameid', 'games.id');

    if (params.tagid) {
      queryBuilder.where('category_tags.id', params.tagid);
    } else if (params.game && params.tag) {
      queryBuilder.where('games.label', params.game)
      .andWhere('category_tags.tag', params.tag);
    }

    queryBuilder.then(tags => {
      if (tags.length === 1) {
        return done(null, tags[0]);
      } else {
        return done(Error('Could not determine category tag from parameters'));
      }
    })
    .catch(err => {
      return done(err);
    });
  }
};
