const {getMessageRepository} = require('../repositories/repositories')
const UUID = require('../helpers/UUID')
const isPalindrome = require('../helpers/isPalindrome')
const ErrorWithCode = require('../errors/ErrorWithCode')

  /**
  * Message type
  * @typedef {Object} Message
  * @property {string} id - id of the message
  * @property {string} message - the message content
  * @property {number} createdAt - timestamp in epoch format representing the creation time of the message
  * @property {number} updatedAt - timestamp in epoch format representing the last update time of the message
  * @property {boolean} isPalindrome - whether the message is a palindrom
  */  

/**
 * Creates a message
 * @param {Object} param0 
 * @param {string} param0.message - message content
 * @param {MessageRepository} [messageRepo]  
 * @returns {Message} - inserted message
 */
async function createMessage({
  message,
  messageRepo=getMessageRepository()
}) {
  let now = Date.now()
  let messageToInsert = {
    id : UUID.generateRandom(),
    createdAt: now,
    updatedAt: now,
    message,
    isPalindrome: isPalindrome({str:message})
  }
  let insertedMessage = await messageRepo.insertMessage({message: messageToInsert})
  return insertedMessage
}

/**
 * Deletes the messsage with the given id 
 * @param {Object} param0 
 * @param {string} param0.id - message id 
 * @param {MessageRepository} [messageRepo]
 * @returns {undefined}
 * @throws {ErrorWithCode} if no message is found with the given id 
 */
async function deleteMessage({id, messageRepo=getMessageRepository()}) {
  let isDeleted = await messageRepo.deleteMessage({id})
  if (!isDeleted){
    throw new ErrorWithCode({code: 'E_RESOURCE_NOT_FOUND', resourceId: id})
  }
}

/**
 * Retrieves the messsage with the given id 
 * @param {Object} param0 
 * @param {string} param0.id - message id 
 * @param {MessageRepository} [messageRepo]
 * @returns {Message}
 * @throws {ErrorWithCode} if no message is found with the given id 
 */
async function getMessage({id, messageRepo=getMessageRepository()}) {
  let message = await messageRepo.getMessage({id})
  if (!message) {
    throw new ErrorWithCode({code: 'E_RESOURCE_NOT_FOUND', resourceId: id})
  }

  return message
}

/**
 * Retrieves all messages
 * @param {Object} param0 
 * @param {MessageRepository} [messageRepo]
 * @returns {Array<Message>}
 * @throws {ErrorWithCode} 
 */
async function getMessages({messageRepo=getMessageRepository()}={}) {
  let messages = await messageRepo.getMessages()
  return messages
}

/**
 * Updates the messsage with the given id 
 * @param {Object} param0 
 * @param {string} param0.id - message id 
 * @param {string} param0.message - message content
 * @param {MessageRepository} [messageRepo]
 * @returns {Message}
 * @throws {ErrorWithCode} if no message is found with the given id 
 */
async function updateMessage({
  id,
  message,
  messageRepo=getMessageRepository(),
}) {

  let messageToUpdate = {
    id,
    message,
    updatedAt: Date.now(),
    isPalindrome: isPalindrome({str:message})
  }

  let updatedMessage = await messageRepo.updateMessage({message: messageToUpdate})
  if (!updatedMessage) {
    throw new ErrorWithCode({code: 'E_RESOURCE_NOT_FOUND', resourceId: id})
  }

  return updatedMessage
}

module.exports = {
  createMessage,
  deleteMessage,
  getMessage,
  getMessages,
  updateMessage
}
