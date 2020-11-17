const MessageService = require('../../services/MessageService')
async function createMessage(req, res, next) {
  try {
    debugger
    await MessageService.createMessage({message: req.body})
    return res.status(201).json({'hello': 'world'})
  }
  catch(e) {
    next(e)
  }

}

module.exports = createMessage
