const MessageService = require('../../services/MessageService')

async function getMessage(req, res, next) {
  try {
    //TODO: validate id
    let message = await MessageService.getMessage({id: req.params.id})
    return res.status(200).json(message)
  }
  catch(e) {
    next(e)
  }

}

module.exports = getMessage
