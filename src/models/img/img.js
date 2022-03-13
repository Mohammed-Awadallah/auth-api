'use strict';

const imgModel = (sequelize, DataTypes) => sequelize.define('img', {
imgURL: { type: DataTypes.STRING, required: true },
imgName : {type: DataTypes.STRING , required : false}
});

module.exports = imgModel;