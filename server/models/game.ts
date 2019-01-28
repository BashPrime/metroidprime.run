import * as getSlug from 'speakingurl';
import { Model } from './model';
import { UserModel } from './user';
import { DbConnector } from '../dbConnector';

export class GameModel extends Model {
  tableName = 'games';
  gameArticleTableName = 'games_articles';
  gameArticleCategoryTableName = 'games_articles_categories';
  connector: DbConnector;

  getGames(done) {
    this.connector.knex.select('*')
      .from(this.tableName)
      .limit(10)
      .then(games => {
        return done(null, games);
      })
      .catch(err => {
        return done(err);
      });
  }

  getDetailedGameById(id, done) {
    this.getGameById(id)
      .then(game => {
        return done(null, game);
      })
      .catch(err => {
        return done(err);
      });
  }

  getGameById(id, columns?) {
    // Allow checking id or abbreviated name
    const column = isNaN(Number(id)) ? 'abbreviation' : 'id';
    const selectableColumns = columns ? columns : '*';

    return this.connector.knex.first(selectableColumns)
      .from(this.tableName)
      .where(column, id);
  }

  async getGameByIdSync(id, columns?) {
    // Allow checking id or abbreviated name
    const column = isNaN(Number(id)) ? 'abbreviation' : 'id';
    const selectableColumns = columns ? columns : '*';

    return await this.connector.knex.first(selectableColumns)
      .from(this.tableName)
      .where(column, id);
  }

  async getGamesByCollectionSync(gameCollection, columns?) {
    const selectableColumns = columns ? columns : '*';
    return await this.connector.knex.select(selectableColumns)
      .from(this.tableName)
      .whereIn('id', gameCollection);
  }

  async getGameIdFromName(name: string) {
    const game = await this.getGameByIdSync(name);

    if (game) {
      return game.id;
    }

    return null;
  }

  async getArticlesForGame(id, done) {
    const selectableColumns = ['id', 'name', 'title', 'description', 'categoryid as category',
      'last_updated_user', 'last_updated_date'];
    const user = new UserModel(this.connector);
    let articles;

    // if id isn't numeric, get the id from the game via a game query
    if (isNaN(Number(id))) {
      const game = await this.getGameByIdSync(id);
      if (!game) {
        return done(null, []);
      }
      id = game.id;
    }

    this.connector.knex.select(selectableColumns)
      .from(this.gameArticleTableName)
      .where('gameid', id)
      .then(articleData => {
        articles = articleData;

        // Proceed with query if articles exist, otherwise return nothing
        if (articles) {
          const updatedUsers = articles.map(article => article.last_updated_user);
          user.getUsersByMultpleIds(updatedUsers)
            .then(users => {
              articles.map(article => {
                article.last_updated_user = users.find(userItem => userItem.id === article.last_updated_user);
              });
              const categories = articles.map(article => article.category);
              return this.connector.knex.select('*').from('games_articles_categories').whereIn('id', categories);
            })
            .then(categories => {
              articles.map(article => {
                article.category = categories.find(categoryItem => categoryItem.id === article.category);
              });
              return done(null, articles);
            })
            .catch(err => {
              return done(err);
            });
        } else {
          return done(null, articles);
        }
      })
      .catch(err => {
        return done(err);
      });
  }

  async getSingleArticleForGame(gameId, articleName, done) {
    const selectableColumns = ['id', 'name', 'title', 'description', 'content', 'categoryid as category',
      'last_updated_user', 'last_updated_date'];
    const user = new UserModel(this.connector);
    let article;

    // if id isn't numeric, get the id from the game via a game query
    if (isNaN(Number(gameId))) {
      const game = await this.getGameByIdSync(gameId);
      if (!game) {
        return done(null, {});
      }
      gameId = game.id;
    }

    this.connector.knex.first(selectableColumns)
      .from(this.gameArticleTableName)
      .where('gameid', gameId)
      .andWhere('name', articleName)
      .then(articleData => {
        article = articleData;
        if (article) {
          const userId = article.last_updated_user;

          // Proceed with other queries if there's an article returned.
          user.getUserById(userId)
            .then(userData => {
              article.last_updated_user = userData;
              return this.connector.knex.first('*').from('games_articles_categories').where('id', article.category);
            })
            .then(categoryData => {
              article.content = JSON.parse(article.content);
              article.category = categoryData;
              return done(null, article);
            })
            .catch(err => {
              return done(err);
            });
        } else {
          return done(null, article);
        }
      })
      .catch(err => {
        return done(err);
      });
  }

  getArticleCategories(done) {
    this.connector.knex.select().table('games_articles_categories')
      .then(categories => {
        return done(null, categories);
      })
      .catch(err => {
        return done(err);
      });
  }

  async createArticle(newArticle, user, game, done) {
    if (!newArticle.slug) {
      newArticle.slug = getSlug(newArticle.title);
    }

    this.connector.knex.insert({
      title: newArticle.title,
      name: newArticle.slug,
      categoryid: newArticle.category,
      content: JSON.stringify(newArticle.content), // store content as JSON string
      last_updated_user: user.id,
      last_updated_date: new Date().toISOString(),
      gameid: await this.getGameIdFromName(game)
    })
      .into(this.gameArticleTableName)
      .then(article => {
        return done(null, article);
      })
      .catch(err => {
        return done(err);
      });
  }

  async updateArticle(article, user, articleId, done) {
    if (!article.slug) {
      article.slug = getSlug(article.title);
    }

    this.connector.knex(this.gameArticleTableName)
    .where('id', articleId)
    .update({
      title: article.title,
      name: article.slug,
      categoryid: article.category,
      content: JSON.stringify(article.content), // store content as JSON string
      last_updated_user: user.id,
      last_updated_date: new Date().toISOString()
    })
    .then(() => {
      return done(null);
    })
    .catch(err => {
      return done(err);
    });
  }
}
