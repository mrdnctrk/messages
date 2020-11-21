const APIErrorCodes = require('../errors/APIErrorCodes')
const ErrorWithCode = require('../errors/ErrorWithCode')
const logger = require('./logger')

/**
 * Looks up the error code in APIErrorCodes.js
 * @param {*} err 
 * @returns {string} APIErrorCode - defaults to E_INTERNAL_SERVER_ERROR if there is no matching code
 */
function getAPIErrorCode(err) {
  if (err instanceof ErrorWithCode) {
    if (APIErrorCodes[err.code]) {
      return err.code
    }
    else {
      logger.error(`No API error code found matching ${err.code}`)
    }
  }
  return 'E_INTERNAL_SERVER_ERROR'
}


function toResponse(err) {
  let apiErrorCode = getAPIErrorCode(err)
  let apiError = APIErrorCodes[apiErrorCode]
  let body = {
    title : apiError.title,
    detail : err.message,
    code: apiErrorCode
  }
  if (err instanceof ErrorWithCode && err.props) {
    //add extra properties from the error object
    Object.assign(body, err.props)
  }

  return {
    body,
    statusCode: apiError.statusCode
  }
}

/**
 * Converts the given err, usually an Error object, to the response body and status code
 * @param {*} err 
 * @returns {Object} returnObj
 * @returns {Object} returnObj.body - response body
 * @returns {number} returnObj.statusCode - http status code
 */
function getErrorResponse (err) {
  let {body, statusCode} = toResponse(err)
  //wrapping in an array to have flexibity for the
  //cases when an endpoint needs send multiple errors in a single response
  body = {
    errors : [body]
  }

  return { body, statusCode }
}

module.exports = getErrorResponse
