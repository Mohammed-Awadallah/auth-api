'use strict';
require('dotenv').config();
const userModel = require('./users.model.js');
const musicModel = require('./music/model.js');
const moviesModel = require('./movies/model.js');
const imgModel = require('./img/img')
const Collection = require('./lib/data-collection-class.js');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;
const { Sequelize, DataTypes } = require('sequelize');
let DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};
const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);
const movies = moviesModel(sequelize, DataTypes);
const music = musicModel(sequelize, DataTypes);
const img = imgModel(sequelize, DataTypes);
module.exports = {
  db: sequelize,
  users: userModel(sequelize, DataTypes),
  movies: new Collection(movies),
  music: new Collection(music),
  img : new Collection(img)
};