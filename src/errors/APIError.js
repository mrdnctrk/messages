class APIError extends Error{

  /**
  * @param {Object} args
  * @param {number} args.statusCode   - http status code, 500 default
  * @param {Array<Error>} args.errors - list of errors
  */
  constructor({statusCode=500, errors}, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, APIError)
    }
    this.name = 'APIError'
    this.statusCode = statusCode
    this.errors = errors
  }


  static fromSingleError({statusCode, error}) {
    return new APIError({statusCode, errors: [error]})

  }

}

module.exports = APIError
