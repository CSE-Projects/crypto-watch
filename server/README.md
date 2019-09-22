### Server

Environment variables to be set

- Secret for jwt token generation
- Username and password to connect to the database

`/bin/.env` file contains default variables set for non-prod use. They are loaded using [dotenv](https://www.npmjs.com/package/dotenv) package

### Usage

Assuming mysql server is up on port 3306 and access allowed with the username and password
```
npm start
```