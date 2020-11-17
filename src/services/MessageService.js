const {getMessageRepository} = require('../repositories/repositories')
const UUID = require('../helpers/UUID')
const isPalindrome = require('../helpers/isPalindrome')
async function createMessage({message, messageRepo=getMessageRepository()}) {
  message.id = UUID.generateRandom()
  const now = Date.now()
  message.createdAt = now
  message.updatedAt = now
  message.isPalindrome = isPalindrome(message.message)
  let insertedMessage = await messageRepo.insertMessage({message})
  return insertedMessage
}

module.exports = {
  createMessage
}
