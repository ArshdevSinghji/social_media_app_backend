import { DataSource, DataSourceOptions, Like } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { User } from './user/entities/user.entity';
import { QuotePost } from './quote-post/entities/quote-post.entity';
import { TextPost } from './text-post/entities/text-post.entity';
import { Post } from './post/entities/post.entity';

dotenvConfig({ path: '.env' });

export const dataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Post, QuotePost, TextPost, Like, 'dist/**/*.entity.js'],
  migrations: ['dist/database/migration/*.js'],
  seeds: ['dist/database/seeds/*.js'],
  synchronize: false,
  logging: false,
} as DataSourceOptions;

export const dataSource = new DataSource(dataSourceOptions);
