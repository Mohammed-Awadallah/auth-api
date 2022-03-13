'use strict';

const movieModel = (sequelize, DataTypes) => sequelize.define('Movies', {
  name: { type: DataTypes.STRING, required: true },
  releaseDate: { type: DataTypes.STRING, required: false },
  genre: { type: DataTypes.ENUM('horror', 'action', 'comedy'), required: true }
});

module.exports = movieModel;