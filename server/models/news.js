// Initialize database object
var knex = require('../queries');
var bcrypt = require('bcrypt');

module.exports = {
  tableName: 'news',
  joinTables: {news: 'news', users: 'users'},
  selectableColumns: ['id', 'title', 'content', 'authorid', 'submitted', 'slug'],
  selectableJoinColumns: {
    id: 'news.id',
    title: 'news.title',
    content: 'news.content',
    authorid: 'news.authorid',
    submitted: 'news.submitted',
    slug: 'news.slug',
    author: 'users.displayname'
  },

  getNews(params = undefined, done) {
    var queryBuilder = knex.select(this.selectableJoinColumns).from(this.joinTables);

    var allowedParams = ['id', 'slug'];
    var queryKeys = Object.keys(params).filter(function (e) { return this.indexOf(e) > -1; }, allowedParams);
    queryBuilder.whereRaw('?? = ??', ['news.authorid', 'users.id']);
    queryBuilder.andWhere('news.enabled', true);

    if (queryKeys.length > 0) {
      queryBuilder.andWhere(qB => {
        for (var i = 0; i < queryKeys.length; i++) {
          let queryParam = queryKeys[i];
          if (i === 0) {
            qB.where('news.' + queryParam, 'in', params[queryParam]);
          } else {
            qB.orWhere('news.' + queryParam, 'in', params[queryParam]);
          }
        }
      })
    }


    queryBuilder.then(news => done(null, news))
    .catch(err => done(err));
  },
};
