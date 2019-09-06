import { getConnection } from "../config/database";
import * as games from './games';
import * as gamesArticlesCategories from './gamesArticlesCategories';
import * as users from './users';

const knex = getConnection();
const columns = [
  'id',
  'slug',
  'title',
  'categoryid',
  'last_updated_user',
  'last_updated_date',
  'gameid'
];

export function getAllForGame(gameAbbreviation: string) {
  let fetchedGame;
  return games.getOneByAbbreviation(gameAbbreviation)
    .then(game => {
      fetchedGame = game;
      return knex.columns(columns).select().from('games_articles').where('gameid', game.id);
    })
    .then(async articles => {
      for (let article of articles) {
        if (article) {
          article.game = fetchedGame;
          article.last_updated_user = await users.getOneByIdSync(article.last_updated_user);
          article.category = await gamesArticlesCategories.getOneByIdSync(article.categoryid);

          delete article.gameid;
          delete article.categoryid;
        }
      }

      return articles;
    });
};

export function getOneForGame(slug: string, gameAbbreviation: string) {
  let fetchedGame;
  return games.getOneByAbbreviation(gameAbbreviation)
    .then(game => {
      fetchedGame = game;
      return knex('games_articles').where('gameid', game.id).andWhere('slug', slug).first();
    })
    .then(async article => {
      if (article && article.content) {
        article.game = fetchedGame;
        article.content = parseContent(article.content);
        article.last_updated_user = await users.getOneByIdSync(article.last_updated_user);
        article.category = await gamesArticlesCategories.getOneByIdSync(article.categoryid);

        delete article.gameid;
        delete article.categoryid;
      }

      return article;
    });
}

function parseContent(content: string) {
  return JSON.parse(content);
}
