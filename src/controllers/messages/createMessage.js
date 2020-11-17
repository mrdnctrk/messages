const MessageService = require('../../services/MessageService')
async function createMessage(req, res, next) {
  try {
    let insertedMessage = await MessageService.createMessage({message: req.body})
    return res.status(201).json(insertedMessage)
  }
  catch(e) {
    next(e)
  }

}

module.exports = createMessage
