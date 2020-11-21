const JSONSchemaValidator = require('./JSONSchemaValidator')
const ErrorWithCode = require('../errors/ErrorWithCode')
/**
 * validates the given request body against the given JSON schema
 * @param {Object} param0 
 * @param {Object} param0.schema - JSON schema
 * @param {Object} param0.body - request body
 * @returns {undefined} - if the body conforms to the schema 
 * @throws {ErrorWithCode} - if the body doesn't conform to the schema
 */
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
