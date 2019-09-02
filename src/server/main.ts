import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import * as http from 'http';
import * as path from 'path';

import * as config from './config.json';
import { getConnection } from './config/database';
import { getPassportStrategies } from './config/passport';
import { defineControllers } from './controllers';

// Initialize express
const app = express();

// Initialize knex connection
getConnection();

// Set up body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set up passport middleware
app.use(passport.initialize());
getPassportStrategies();

// Angular dist output folder for static files
app.use(express.static(path.join(__dirname, './client')));

// API location (all node routes will fall under /api path)
app.use('/api', defineControllers());

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'));
});

const port = config.server.port;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`metroid-prime-randomizer server running on localhost:${port}`);
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
