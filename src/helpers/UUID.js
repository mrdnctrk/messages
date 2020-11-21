const {v4, validate} = require('uuid')

/**
 * generates a random v4 uuid
 * @returns {string} - generated uuid 
 */
function generateRandom() {
  return v4()
}

/**
 * checks if the given uuid is a valid uuid
 * @param {string} uuid 
 */
function isValid(uuid) {
  return validate(uuid)
}

module.exports = {
  generateRandom,
  isValid
}
