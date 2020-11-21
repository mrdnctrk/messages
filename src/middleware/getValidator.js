const validateRequestBody = require('../helpers/validateRequestBody')

/**
 * Creates a middleware to validate a request body based on the given schema
 * 
 * @param {Object} schema - JSON schema to validate the request body against 
 * @returns {Function} - the middleware function
 */
function getValidator(schema) {
  const validationMiddleware = function (req, res, next) {
    try {
      validateRequestBody({schema, body: req.body})
      next()
    }
    catch (e) {
      next(e)
    }
  }
  return validationMiddleware
}


module.exports = getValidator

