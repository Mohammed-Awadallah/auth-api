'use strict';

const musicModel = (sequelize, DataTypes) => sequelize.define('Clothes', {
  artist: { type: DataTypes.STRING, required: true },
  songName: { type: DataTypes.STRING, required: true },
  genre: { type: DataTypes.STRING, required: true }
});

module.exports = musicModel;