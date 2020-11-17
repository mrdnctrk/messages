const {getMessageRepository} = require('../repositories/repositories')

async function createMessage({message, messageRepo=getMessageRepository()}) {
  await messageRepo.insertMessage({message})
}

module.exports = {
  createMessage
}
