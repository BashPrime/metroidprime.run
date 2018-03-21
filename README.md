# metroidprime.run

Code and database scaffolding for the metroidprime.run website.

## About

The web application is powered by [Angular](https://angular.io), [Node.js](https://nodejs.org), and [Express.js](https://expressjs.com/).

The database used on metroidprime.run is [PostgreSQL 10](https://www.postgresql.org/). While other databases can technically be used due this project using [Knex.js](http://knexjs.org), this project assumes you are using a PostgreSQL server.

## Install

You will need [Node.js](https://nodejs.org) to download the project dependencies using `npm`. Once you're ready to go, run the following commands:

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

In the `token` section of your `config.js` file, you will see the `secretKey` entry; it is higly recommended you use a randomly-generated key for signing any authentication tokens the app creates. For convenience, you can run the following command to generate a secret key.

```bash
npm run generate:secret
```

Just copy and paste the generated key to your `secretKey` value once it is generated.

After setting up your server/database configuration, run the following command to scaffold your Postgres tables:

```bash
npm run initdb
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

### Production

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
