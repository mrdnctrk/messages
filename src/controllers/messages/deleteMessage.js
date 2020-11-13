async function deleteMessage(req, res, next) {
  try {
    return res.status(204).end()
  }
  catch(e) {
    next(e)
  }

}

module.exports = deleteMessage
