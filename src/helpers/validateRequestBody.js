const JSONSchemaValidator = require('./JSONSchemaValidator')
const ErrorWithCode = require('../errors/ErrorWithCode')

function validateRequestBody({schema, body}) {
  try {
    let validator = JSONSchemaValidator.fromSchema(schema)
    validator.validate(body)
  }
  catch (e) {
    throw new ErrorWithCode({
      code: 'E_INVALID_REQUEST_BODY',
      invalidFields : [{
        path: e.dataPath,
        reason: e.keyword
      }]
    })
  }
}

module.exports = validateRequestBody
