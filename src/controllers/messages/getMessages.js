async function getMessages(req, res, next) {
  try {
    return res.status(200).json({list: [{message: 'hello world'}]})
  }
  catch(e) {
    next(e)
  }

}

module.exports = getMessages
