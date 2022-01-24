## VIDEO GAME API SALES - EXPRESSJS

This Restful API was developed with a nodeJs, Sequelize and PostgreSQL backend. This API is used to manipulate data coming from a dataset, in this case, about 16,000 pieces of information about sales of games over 100,000 copies and sales editions.

### Dependencies

Some technologies used in this work:

- [Express.js](https://expressjs.com/en/starter/hello-world.html)
- [Sequelize ORM](https://sequelize.org/)
- [db-migrate](https://github.com/db-migrate/pg)
- [PostgresSQL](https://www.postgresql.org)
- [JTW - Json Web Token](https://www.npmjs.com/package/jsonwebtoken)
- [Kaggle API](https://github.com/Kaggle/kaggle-api)
- [Swagger Docs](https://swagger.io/)

### Installation

Run `npm i` or `npm install` to install all modules.

After installing the dependencies, you must create an .env file or change the current one.

| Key               | Value          |
| ----------------- | -------------- |
| PORT              | 3000           |
| VERSION           | 1.0.0          |
| HOSTNAME          | localhost      |
| HOSTNAME_PORT     | localhost:3000 |
| DRIVER            | pg             |
| DIALECT           | postgres       |
| POSTGRES_HOSTNAME | localhost      |
| POSTGRES_PORT     | 5432           |
| POSTGRES_DATABASE | sd             |
| POSTGRES_USERNAME | sd             |
| POSTGRES_PASSWORD | sd             |
| POSTGRES_SCHEMA   | public         |
| JWT_SECRET        | key            |
| ROUTE_PREFIX      | /api/v1        |


### Kaggle API

In this project I used the _Kaggle API (datasets website)_ to download datasets automatically.

To do this, you need the _credentials_.  
Step by step how to get the _credentials_: [Kaggle API Docs](https://github.com/Kaggle/kaggle-api)

### Set up database using db-migrate

To set up database, you only need to run the command:

    npm run migrateup

Or to set down:

    npm run migradown

### Download dataset using Kaggle and import CSV to database

To download a new dataset using Kaggle, you just need to run the next command in data folder `npm run runMigrations datasetName fileName`. Example:

    npm run runMigrations gregorut/videogamesales dataset.csv

### Read csv without use kaggle

If you don't want to use kaggle, you have to download the csv manually, put it inside the "data" folder and rename it to "dataset.csv".

To import the data into the database, you have to use the command:

    npm run readCsv

### API DOCUMENTATION

This API have a documentation created with swagger express. To access the API docs, you need to run server, and access `localhost:3000/api/v1/api/api-docs`

### JWT TOKEN

All routes are protected with tokens. To acquire a token, you need to login. They are protected by several types of permissions that can be seen in the documentation. Predefined API accounts.

| Email         | Password |
| ------------- | -------- |
| admin@ipvc.pt | admin    |
| view@ipvc.pt  | view     |
| edit@ipvc.pt  | edit     |


**Conclusion**

This project was developed for a distributed services class as final project , with the main purpose of learning about REST architecture, ORM, PostgreSQL and JWT