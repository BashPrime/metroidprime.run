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
    secretKey: '', // use "npm run genSecretKey" to generate a secret key. Copy and paste it here
    expiresIn: 806400 // 1 week in seconds
  }
};

module.exports = config;
