var knex = require('../queries');
var Utilities = require('../utilities');

function getCategoryById(categoryId, done) {
    knex.select('*')
    .from('categories')
    .where('id', categoryId)
    .then(categories => {
        if (categories.length === 1) {
            return categories[0];
        } else {
            return done(err, null);
        }
    })
    .catch(err => {
        return done (err);
    });
}

async function getCategoryByIdSync(categoryId) {
    const categories = await knex.select('*')
    .from('categories')
    .where('id', categoryId);

    if (categories.length === 1) {
        return categories[0];
    }

    return null;
}

module.exports.getCategoryById = getCategoryById;
module.exports.getCategoryByIdSync = getCategoryByIdSync;