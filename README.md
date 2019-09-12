# metroidprime.run

Code and database scaffolding for https://metroidprime.run.

## About

This web application is powered by [Angular](https://angular.io), [TypeScript](https://www.typescriptlang.org), [Node.js](https://nodejs.org), [Express.js](https://expressjs.com), and [Knex.js](https://knexjs.org).

This app uses [PostgreSQL 10](https://www.postgresql.org/) for the database. While other databases can technically be used due this project using Knex, this project assumes you are using a PostgreSQL server.

## Install

You will need to install [Node.js](https://nodejs.org) to download the project dependencies using `npm`. Once you have Node installed, run the following commands:

Run the following command to create a new config file for the application:

```bash
npm run generate:config
```

You will need to configure your database connection settings in `/src/server/config.json`. For example:

```javascript
database: {
  host: 'localhost',
  port: 5432,
  user: 'foo',
  password: 'bar',
  database: 'metroidprimerun'
}
```

After configuring your server, run the following command to scaffold the database:

```bash
npm run initdb
```

## Running the Application

### Development

To start the Angular client with hot reloading support, run the following command, then open [http://localhost:4200](http://localhost:4200) in your browser:

(NOTE: You will need to change the port in `proxy.conf.json` if you change the server port in `config.json`)

```bash
npm run client
```

To start the Express server with hot reloading support, run the following command:

```bash
npm run server:dev
```

### Production

To build the application for production use, run the following command:

```bash
npm run build:prod
```

This will build both the Angular client and Node server for production use, and output both bundles to the `/dist` folder.

To run the application in production, run the following command:

```bash
npm run server:prod
```
