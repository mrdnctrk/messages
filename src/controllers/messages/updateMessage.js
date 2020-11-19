const MessageService = require('../../services/MessageService')

async function updateMessage(req, res, next) {
  try {
    let message = Object.assign({}, req.body, {id: req.params.id})
    message = await MessageService.updateMessage({message})
    return res.status(200).json(message)
  }
  catch(e) {
    next(e)
  }

}

module.exports = updateMessage
