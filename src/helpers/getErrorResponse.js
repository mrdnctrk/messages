const APIError = require('../errors/APIError')

function getErrorResponse (err) {
  let body = {}
  let statusCode = 500
  if (Array.isArray(err.errors)) {
    body.errors = err.errors
  }
  else {
    body.errors = [err]
  }

  if (err instanceof APIError) {
    statusCode = err.statusCode
  }
  return { body, statusCode }
}

module.exports = getErrorResponse
