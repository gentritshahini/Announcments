const express = require('express');
const router = express.Router();
const taskService = require('../Services/tasksService');

// routes
router.post('/create', create);
router.get('/', getAll);

function create(req, res, next) {
    taskService.create(req.body)
    .then(task => res.json(task))
    .catch(next);
}

function getAll(req, res, next) {
    // TODO
}

module.exports = router;