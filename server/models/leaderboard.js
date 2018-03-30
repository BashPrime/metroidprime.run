var knex = require('../queries');
var Utilities = require('../utilities');
var Category = require('./category');

async function getLeaderboardsByCategory(categoryId, queryParams, done) {
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
        tag: 'category_tags.tag',
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
        date: 'records.date',
        submitted: 'records.submitted',
        submitterid: 'records.submitterid',
        submitter: 'submitusers.displayname'
      })
      .from('records')
      .innerJoin(minTimes, 'min_times.playerid', 'records.playerid')
      .whereRaw('records.' + category.timing + ' = min_times.mingametime');
      
      if (queryParams.tag) {
        queryBuilder.andWhere('category_tags.tag', queryParams.tag);
      } else if (category.defaulttag) {
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
        var results = Object.assign({}, category);
        results.runs = rankedRecords;
        return done(null, results);
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
  getLeaderboardsByCategory: getLeaderboardsByCategory
};
