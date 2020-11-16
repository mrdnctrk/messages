const validateRequestBody = require('../helpers/validateRequestBody')

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

