'use strict';

const express = require('express');
const dataModules = require('../models');
const router = express.Router();
const bearerAuth = require('../middleware/bearer.js');
const requiredPerm = require('../middleware/acl.js');

router.param('model', (req, res, next) => {
    if (dataModules[req.params.model]) {
        req.model = dataModules[req.params.model];
        next();
    } else {
        next('Model not found please enter a valid model');
    }
});
router.get('/:model', bearerAuth, requiredPerm('read'), getAll);
router.get('/:model/:id', bearerAuth, requiredPerm('read'), getOneByID);
router.post('/:model', bearerAuth, requiredPerm('create'), addNew);
router.put('/:model/:id', bearerAuth, requiredPerm('update'), updateHandler);
router.delete('/:model/:id', bearerAuth, requiredPerm('delete'), deleteHandler);
async function getAll(req, res) {
    let allRecords = await req.model.get();
    res.status(200).json(allRecords);
}

async function getOneByID(req, res) {
    const id = req.params.id;
    let theRecord = await req.model.get(id)
    res.status(200).json(theRecord);
}

async function addNew(req, res) {
    let obj = req.body;
    let newRecord = await req.model.create(obj);
    res.status(201).json(newRecord);
}

async function updateHandler(req, res) {
    const id = req.params.id;
    const obj = req.body;
    let updatedRecord = await req.model.update(id, obj)
    res.status(201).json(updatedRecord);
}

async function deleteHandler(req, res) {
    let id = req.params.id;
    let deletedRecord = await req.model.delete(id);
    res.status(204).json(deletedRecord);
}


module.exports = router;