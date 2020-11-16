const express = require('express');
const createMessage = require('./createMessage');
const getMessages = require('./getMessages');
const deleteMessage = require('./deleteMessage');
const updateMessage = require('./updateMessage');

const messageSchema = require('../../apischemas/messages/message.json')

//TODO: rename the filename
const getValidator = require('../../middleware/validator')

const messagesRouter = express.Router();

messagesRouter.post('/', getValidator(messageSchema), createMessage);
messagesRouter.get('/', getMessages);
messagesRouter.put('/:id', getValidator(messageSchema), updateMessage);
messagesRouter.delete('/:id', deleteMessage);

module.exports = messagesRouter
