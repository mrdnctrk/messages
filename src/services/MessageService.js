const {getMessageRepository} = require('../repositories/repositories')
const UUID = require('../helpers/UUID')
const isPalindrome = require('../helpers/isPalindrome')
const ErrorWithCode = require('../errors/ErrorWithCode')

async function createMessage({message, messageRepo=getMessageRepository()}) {
  message.id = UUID.generateRandom()
  const now = Date.now()
  message.createdAt = now
  message.updatedAt = now
  message.isPalindrome = isPalindrome(message.message)
  let insertedMessage = await messageRepo.insertMessage({message})
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

async function updateMessage({message, messageRepo=getMessageRepository()}) {
  const now = Date.now()
  message.updatedAt = now
  message.isPalindrome = isPalindrome(message.message)
  let updatedMessage = await messageRepo.updateMessage({message})
  if (!updatedMessage) {
    throw new ErrorWithCode({code: 'E_RESOURCE_NOT_FOUND', resourceId: message.id})
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
