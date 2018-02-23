var config = {
    database: {
        host: 'localhost',
        port: 5432,
        user: '',
        password: '',
        database: '' // this is the database/schema name your tables reside in
    },
    server: {
        port: 3000
    },
    token: {
      privateKey: 'privatekey',
      expiry: 1 * 60 * 60 * 1000
    }
};

module.exports = config;
