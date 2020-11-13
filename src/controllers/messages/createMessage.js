async function createMessage(req, res, next) {
  try {
    return res.status(201).json({'hello': 'world'})
  }
  catch(e) {
    next(e)
  }

}

module.exports = createMessage
