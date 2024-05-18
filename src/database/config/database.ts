import 'dotenv/config';
import { Options } from 'sequelize';

const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT } = process.env;


const config: Options =  {
  "username": DB_USER,
  "password": DB_PASSWORD,
  "database": DB_NAME,
  "host": DB_HOST,
  "port": Number(DB_PORT),
  "dialect": "postgres"
}

export = config;