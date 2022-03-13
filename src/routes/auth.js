'use strict';

const express = require('express');
const authRouter = express.Router();
const { users } = require('../models/index');
const basicAuth = require('../middleware/basic.js')
const bearerAuth = require('../middleware/bearer.js')
const cabablitesMid = require('../middleware/acl.js')

authRouter.post('/signup', async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message)
  }
});
authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token
  };
  res.status(200).json(user);
});

authRouter.get('/users', bearerAuth, cabablitesMid('delete'), async (req, res, next) => {
  const userRecords = await users.findAll({});
  const usersList = userRecords.map(user => user.username);
  res.status(200).json(usersList);
});

authRouter.get('/secretStuff', bearerAuth, async (req, res, next) => {
  res.status(200).json(req.body)
});

module.exports = authRouter;