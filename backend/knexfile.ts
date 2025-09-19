import type { Knex } from 'knex';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
    migrations: {
      directory: path.join(__dirname, 'src/db/migrations'),
      extension: 'ts',
    },
    seeds: {
      directory: path.join(__dirname, 'src/db/seeds'),
      extension: 'ts',
    },
  },

  // You can add staging and production configs here

};

export default config;
