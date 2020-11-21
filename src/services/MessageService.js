const {getMessageRepository} = require('../repositories/repositories')
const UUID = require('../helpers/UUID')
const isPalindrome = require('../helpers/isPalindrome')
const ErrorWithCode = require('../errors/ErrorWithCode')

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

async function deleteMessage({id, messageRepo=getMessageRepository()}) {
  let isDeleted = await messageRepo.deleteMessage({id})
  if (!isDeleted){
    throw new ErrorWithCode({code: 'E_RESOURCE_NOT_FOUND', resourceId: id})
  }
}


async function getMessage({id, messageRepo=getMessageRepository()}) {
  let message = await messageRepo.getMessage({id})
  if (!message) {
    throw new ErrorWithCode({code: 'E_RESOURCE_NOT_FOUND', resourceId: id})
  }

  return message
}

async function getMessages({messageRepo=getMessageRepository()}={}) {
  let messages = await messageRepo.getMessages()
  return messages
}

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
