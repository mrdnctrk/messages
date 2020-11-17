const APIError = require('../errors/APIError')

function getErrorResponse (err) {
  let body = {}
  let statusCode = 500
  //TODO: Fix error serialization
  if (Array.isArray(err.errors)) {
    body.errors = err.errors
  }
  else {
    body.errors = [{message: err.message, ...err }]
  }

  if (err instanceof APIError) {
    statusCode = err.statusCode
  }
  return { body, statusCode }
}

module.exports = getErrorResponse
