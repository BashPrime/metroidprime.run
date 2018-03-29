var knex = require('../queries');
var Utilities = require('../utilities');

function getGameById(gameId, done) {
    knex.select('*')
    .from('games')
    .where('id', gameId)
    .then(games => {
        if (games.length === 1) {
            return games[0];
        } else {
            return done(err, null);
        }
    })
    .catch(err => {
        return done (err);
    });
}

async function getGameByIdSync(id) {
    const games = await knex.select('*')
    .from('games')
    .where('id', id);

    if (games.length === 1) {
        return games[0];
    } else {
        return undefined;
    }
}

module.exports.getGameById = getGameById;
module.exports.getGameByIdSync = getGameByIdSync;