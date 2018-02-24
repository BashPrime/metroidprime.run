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
    expiresIn: 806400 // 1 week
  }
};

module.exports = config;
