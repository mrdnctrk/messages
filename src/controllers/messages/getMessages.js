const MessageService = require('../../services/MessageService')

async function getMessages(req, res, next) {
  try {
    let messages = await MessageService.getMessages()
    return res.status(200).json({list: messages})
  }
  catch(e) {
    next(e)
  }

}

module.exports = getMessages
