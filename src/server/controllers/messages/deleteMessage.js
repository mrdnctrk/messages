const MessageService = require('../../../services/MessageService')

async function deleteMessage(req, res, next) {
  try {
    await MessageService.deleteMessage({id: req.params.id})
    return res.status(204).end()
  }catch(e) {
    next(e)
  }

}

module.exports = deleteMessage
