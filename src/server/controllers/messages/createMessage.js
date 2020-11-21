const MessageService = require('../../../services/MessageService')

async function createMessage(req, res, next) {
  try {
    let message = req.body.message
    let insertedMessage = await MessageService.createMessage({message})
    res.location(`${req.baseUrl}/${insertedMessage.id}`)
    return res.status(201).json(insertedMessage)
  }
  catch(e) {
    next(e)
  }

}

module.exports = createMessage
