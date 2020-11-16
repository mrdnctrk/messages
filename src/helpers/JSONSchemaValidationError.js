class JSONSchemaValidationError extends Error {
  constructor({keyword, dataPath}, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, JSONSchemaValidationError)
    }

    this.name = 'JSONSchemaValidationError'
    // Custom debugging information
    this.keyword = keyword
    this.dataPath = dataPath
  }

}
module.exports = JSONSchemaValidationError
