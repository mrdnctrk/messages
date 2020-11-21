const getErrorResponse = require('../../helpers/getErrorResponse')

function errorHandler (err, req, res, next) {
  if (err) {
    let {statusCode, body} = getErrorResponse(err)
    return res.status(statusCode).json(body)
  }
  else {
    next()
  }
}

module.exports = errorHandler
