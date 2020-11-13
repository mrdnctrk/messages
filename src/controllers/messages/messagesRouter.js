const express = require('express');
const createMessage = require('./createMessage');
const getMessages = require('./getMessages');
const deleteMessage = require('./deleteMessage');
const updateMessage = require('./updateMessage');

const messagesRouter = express.Router();

messagesRouter.post('/', createMessage);
messagesRouter.get('/', getMessages);
messagesRouter.put('/:id', updateMessage);
messagesRouter.delete('/:id', deleteMessage);

module.exports = messagesRouter
