const MessageService = require('../../services/MessageService')

async function updateMessage(req, res, next) {
  try {
    let id = req.params.id
    let message = req.body.message
    message = await MessageService.updateMessage({id, message})
    return res.status(200).json(message)
  }
  catch(e) {
    next(e)
  }

}

module.exports = updateMessage
