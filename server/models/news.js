// Initialize database object
var knex = require('../queries');
var Utilities = require('../utilities');
var bcrypt = require('bcrypt');

module.exports = {
  tableName: 'news',
  selectableColumns: ['id', 'title', 'content', 'authorid', 'submitted', 'slug'],

  getNews(params = undefined, done) {
    var queryBuilder = knex.select({
      id: 'news.id',
      title: 'news.title',
      content: 'news.content',
      authorid: 'news.authorid',
      author: 'authorusers.displayname',
      submitted: 'news.submitted',
      slug: 'news.slug'
    })
    .from(this.tableName)
    .where('news.enabled', true)
    .leftJoin('users as authorusers', 'news.authorid', 'authorusers.id');

    const allowedParams = {
      id: 'news.id',
      slug: 'news.slug',
      authorid: 'news.authorid',
      author: 'authorusers.name'
    };

    queryBuilder = Utilities.handleQueryParams(params, allowedParams, queryBuilder);
    
    queryBuilder.then(news => done(null, news))
    .catch(err => done(err));
  },
};
