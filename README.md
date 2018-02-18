# metroidprime.run

Code and database scaffolding for the metroidprime.run website.

## About

The web application is powered by [Angular](https://angular.io), [Node.js](https://nodejs.org), and [Express.js](https://expressjs.com/).

The database used on metroidprime.run is [PostgreSQL 10](https://www.postgresql.org/). As the project uses the `pg-promise` dependency, no other database servers outside of Postgres are currently supported.

## Install

You will need [Node.js](https://nodejs.org) to download the project dependencies using NPM. Once you're ready to go, run the following commands:

```bash
npm install -g @angular/cli
npm install
```

Run the following command to create a new config file, `config.js`, for the application:

```bash
npm run server
```

You will need to configure your database connection settings in `config.js`. For example:

```javascript
database: {
  host: 'localhost',
  port: 5432,
  user: 'foo',
  password: 'bar',
  database: 'metroidprimerun'
}
```

Then, you will need to run the `.sql` files found in `/server/db/schema` to scaffold your Postgres database. There will be a script written in the future to automate this, but for the time being run the following files using `psql` or your preferred Postgres tool in their specific order:

```
users.sql
regions.sql
games.sql
categories.sql
records.sql
```

## Running the Application

### Development

To start the Angular client with hot reloading support, run the following command, then open [http://localhost:4200](http://localhost:4200) in your browser:

(NOTE: You will need to change the port in `proxy.conf.json` if you change the server port in `config.js`)

```bash
npm run client
```

To start the Express server, run the following command. The server does not support hot reloading, so you will have to restart it after making any changes.

```bash
npm run server
```

## Production

First, run a production build of the Angular webapp:

```bash
ng build --prod
```

Then, start the Express server:

```bash
npm run server
```

Any routes outside of `/api` will redirect to the Angular website on your server port.

At this point, you will want to set up a separate web server for HTTPS and reverse proxying to the application.
