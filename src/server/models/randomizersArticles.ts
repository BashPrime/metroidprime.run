import { getConnection } from "../config/database";
import * as randomizers from './randomizers';
import * as randomizersArticlesCategories from './randomizersArticlesCategories';
import * as users from './users';

const knex = getConnection();

export function getAllForRandomizer(randoAbbreviation: string) {
  let fetchedRandomizer;
  return randomizers.getOneByAbbreviation(randoAbbreviation)
    .then(randomizer => {
      fetchedRandomizer = randomizer;
      return knex('randomizers_articles').where('randomizerid', randomizer.id);
    })
    .then(async articles => {
      for (let article of articles) {
        if (article && article.content) {
          article.randomizer = fetchedRandomizer;
          article.content = parseContent(article.content);
          article.last_updated_user = await users.getOneByIdSync(article.last_updated_user);
          article.category = await randomizersArticlesCategories.getOneByIdSync(article.categoryid);

          delete article.randomizerid;
          delete article.categoryid;
        }
      }

      return articles;
    });
};

export function getOneForRandomizer(slug: string, randoAbbreviation: string) {
  let fetchedRandomizer;
  return randomizers.getOneByAbbreviation(randoAbbreviation)
    .then(randomizer => {
      fetchedRandomizer = randomizer;
      return knex('randomizers_articles').where('randomizerid', randomizer.id).andWhere('slug', slug).first();
    })
    .then(async article => {
      if (article && article.content) {
        article.randomizer = fetchedRandomizer;
        article.content = parseContent(article.content);
        article.last_updated_user = await users.getOneByIdSync(article.last_updated_user);
        article.category = await randomizersArticlesCategories.getOneByIdSync(article.categoryid);
      }

      return article;
    });
}

function parseContent(content: string) {
  return JSON.parse(content);
}
