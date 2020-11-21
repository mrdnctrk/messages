const ErrorWithCode = require('../../errors/ErrorWithCode')

function unknownEndpointHandler(req, res, next) {
  let err = new ErrorWithCode({code: 'E_UNKNOWN_ENDPOINT'})
  next(err)
}


module.exports = unknownEndpointHandler
