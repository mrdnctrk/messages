const JSONSchemaValidator = require('./JSONSchemaValidator')
const APIError = require('../errors/APIError')

function validateRequestBody({schema, body}) {
  try {
    let validator = JSONSchemaValidator.fromSchema(schema)
    validator.validate(body)
  }
  catch (e) {
    const error = new Error()
    error.errorCode = 'E_INVALID_REQUEST_BODY'
    error.invalidFields = [{
      path: e.dataPath,
      reason: e.keyword
    }]

    throw APIError.fromSingleError({
      statusCode: 400,
      error
    })
  }

}

module.exports = validateRequestBody
