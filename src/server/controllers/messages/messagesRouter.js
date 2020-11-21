const express = require('express');
const createMessage = require('./createMessage');
const getMessage = require('./getMessage');
const getMessages = require('./getMessages');
const deleteMessage = require('./deleteMessage');
const updateMessage = require('./updateMessage');

const messageSchema = require('../../../apischemas/messages/message.json')

const getValidator = require('../../middleware/getValidator')

const messagesRouter = express.Router();

messagesRouter.post('/', getValidator(messageSchema), createMessage);
messagesRouter.get('/', getMessages);
messagesRouter.get('/:id', getMessage);
messagesRouter.put('/:id', getValidator(messageSchema), updateMessage);
messagesRouter.delete('/:id', deleteMessage);

module.exports = messagesRouter
