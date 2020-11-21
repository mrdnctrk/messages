const { validator } = require('@exodus/schemasafe')
const JSONSchemaValidationError = require('./JSONSchemaValidationError')

/**
 * Instances of this class can be used to validate json against a specific JSON schema 
 */
class JSONSchemaValidator {
  /**
   * Creates a json schema validator for the given json schema 
   * @param {Object} schema - JSON schema 
   */
  static fromSchema(schema) {
    let instance = new JSONSchemaValidator()
    const validate = validator(schema, {
      includeErrors : true,
      useDefaults: true,
      extraFormats: true
    })

    instance._validateFn = validate
    return instance
  }

  /**
   * Validates the given JSON against the schema 
   * @param {*} data 
   * @returns {undefined} if data conforms to the schema  
   * @throws {JSONSchemaValidationError} if data doesn't conform to the schema
   */
  validate(data) {
    let result = this._validateFn(data)
    if (!result) {
      let error = this._validateFn.errors[0]
      let keyword = error.keywordLocation.split('/').pop()
      let dataPath = error.instanceLocation.substring(1)
      throw new JSONSchemaValidationError({keyword, dataPath})
    }
  }
}

module.exports = JSONSchemaValidator
