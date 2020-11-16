const assert = require('assert')
const JSONSchemaValidator = require('../../../src/helpers/JSONSchemaValidator')
describe('JSONSchemaValidator tests', () => {
  const schema = Object.freeze({
    type: 'object',
    required: ['hello'],
    properties: {
      hello: {
        type: 'string'
      },
      nested: {
        type: 'object',
        required: ['x'],
        properties: {
          x: {
            type: 'number'
          }
        }

      }
    }
  })

  it('validates confirming data', () =>{
    let validator = JSONSchemaValidator.fromSchema(schema)
    validator.validate({ hello: 'world' })
  })

  it('throws error on non-conforming data', () => {
    let validator = JSONSchemaValidator.fromSchema(schema)
    let expectedError = {
      name: 'JSONSchemaValidationError',
      keyword: 'type',
      dataPath: '/hello'
    }

    assert.throws(() => {
      validator.validate({ hello: 5 })
    }, expectedError)

    expectedError = {
      name: 'JSONSchemaValidationError',
      keyword: 'required',
      dataPath: '/nested/x'
    }

    assert.throws(() => {
      validator.validate({ hello: 'world', nested: { y: 1 }})
    }, expectedError)

  })

})
