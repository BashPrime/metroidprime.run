import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import * as path from 'path';
import * as http from 'http';
import { Utilities } from './utilities';

const app = express();
let config;

try {
  config = require('../config.json');
} catch (e) {
  Utilities.generateConfig();
  console.log('You will need to configure your database credentials in this file before running the server.');
  process.exit(e.code);
}

import { ApiController } from './controllers/api';
import { PassportHandler } from './passport';

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Passport Middleware
const passportHandler = new PassportHandler(passport);
app.use(passport.initialize());
app.use(passport.session());

// Angular DIST output folder
app.use(express.static(path.join(__dirname, '../dist')));

// API location (all node routes will fall under /api path)
app.use('/api', new ApiController().router);

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500)
    .json({
      success: false,
      message: err.message
    });
});

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Set Port
const port = config.server.port;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`metroidprime.run server running on localhost:${port}`);
});

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);
process.on('SIGUSR2', shutDown); // nodemon restart

let connections = [];

server.on('connection', connection => {
  connections.push(connection);
  connection.on('close', () => connections = connections.filter(curr => curr !== connection));
});

function shutDown() {
  console.log('Received kill signal, shutting down');

  server.close(() => {
    console.log('Closed out remaining connections');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);

  connections.forEach(curr => curr.end());
  setTimeout(() => connections.forEach(curr => curr.destroy()), 5000);
}
