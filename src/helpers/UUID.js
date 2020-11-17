const {v4, validate} = require('uuid')


function generateRandom() {
  return v4()
}

function isValid(uuid) {
  return validate(uuid)
}

module.exports = {
  generateRandom,
  isValid
}
