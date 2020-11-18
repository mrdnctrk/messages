const {getMessageRepository} = require('../repositories/repositories')
const UUID = require('../helpers/UUID')
const isPalindrome = require('../helpers/isPalindrome')
const APIError = require('../errors/APIError')

async function createMessage({message, messageRepo=getMessageRepository()}) {
  message.id = UUID.generateRandom()
  const now = Date.now()
  message.createdAt = now
  message.updatedAt = now
  message.isPalindrome = isPalindrome(message.message)
  let insertedMessage = await messageRepo.insertMessage({message})
  return insertedMessage
}

async function getMessage({id, messageRepo=getMessageRepository()}) {
  let message = await messageRepo.getMessage({id})
  if (!message) {
    //TODO: stream line errors
    const error = new Error()
    error.errorCode = 'E_RESOURCE_NOT_FOUND'
    error.resourceId = id
    throw APIError.fromSingleError({
      statusCode: 404,
      error
    })
  }

  return message
}

async function updateMessage({message, messageRepo=getMessageRepository()}) {
  const now = Date.now()
  message.updatedAt = now
  message.isPalindrome = isPalindrome(message.message)
  let updatedMessage = await messageRepo.updateMessage({message})
  if (!updatedMessage) {
    //TODO: stream line errors
    const error = new Error()
    error.errorCode = 'E_RESOURCE_NOT_FOUND'
    error.resourceId = message.id
    throw APIError.fromSingleError({
      statusCode: 404,
      error
    })
  }

  return updatedMessage
}

module.exports = {
  createMessage,
  getMessage,
  updateMessage
}
