async function updateMessage(req, res, next) {
  try {
    return res.status(200).json({'hello': 'world'})
  }
  catch(e) {
    next(e)
  }

}

module.exports = updateMessage
