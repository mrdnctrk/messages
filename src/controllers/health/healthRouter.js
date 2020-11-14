const express = require('express');
const getReadiness = require('./getReadiness');
const healthRouter = express.Router();

healthRouter.get('/readiness', getReadiness);
module.exports = healthRouter
