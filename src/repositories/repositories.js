const MessageRepository = require('./MessageRepository')
const {getDB} = require('./database')
let messageRepository

function getMessageRepository() {
  if (!messageRepository) {
    messageRepository = new MessageRepository(getDB())
  }
  return messageRepository
}

module.exports = {
  getMessageRepository
}





