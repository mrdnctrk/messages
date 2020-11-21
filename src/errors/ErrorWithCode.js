class ErrorWithCode extends Error{

  /**
  * @param {Object} param0 - an object containing an error code and a free form of properties that
  *                          should help clarify the error. The props is supposed to vary depending on
  *                          the error code.
  * @param {string} param0.code  - the error code
  */
  constructor({code, ...props}, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ErrorWithCode)
    }
    this.name = 'ErrorWithCode'
    this.props = props
    this.code = code
  }

}

module.exports = ErrorWithCode
