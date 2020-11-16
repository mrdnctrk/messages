const { validator } = require('@exodus/schemasafe')
const JSONSchemaValidationError = require('./JSONSchemaValidationError')

class JSONSchemaValidator {

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
