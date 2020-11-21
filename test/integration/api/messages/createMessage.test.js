const APIClient = require('../APIClient')
const assert = require('assert')

describe('create message tests', () => {
  let apiClient = APIClient.fromEnv()

  it('creates a message', async () =>{
    let res = await apiClient.createMessage({
      message: { message: 'Hello world' }
    })

    assert.equal(res.headers.location, `/api/messages/${res.body.id}`)

    let body = res.body
    assert.equal(body.message, 'Hello world')
    assert.ok(body.id)
    assert.ok(typeof body.id === 'string')
    assert.ok(typeof body.createdAt === 'number')
    assert.ok(body.updatedAt === body.createdAt)
    assert.equal(body.isPalindrome, false)
  })

  it('creates a palindrome message', async () =>{
    let res = await apiClient.createMessage({
      message: { message: 'rotator' }
    })

    assert.equal(res.headers.location, `/api/messages/${res.body.id}`)

    let body = res.body
    assert.equal(body.message, 'rotator')
    assert.ok(body.id)
    assert.ok(typeof body.id === 'string')
    assert.ok(typeof body.createdAt === 'number')
    assert.ok(body.updatedAt === body.createdAt)
    assert.equal(body.isPalindrome, true)
  })

  it('fails if message is missing or null', async () =>{
    let res = await apiClient.createMessage({
      expectedStatus:400})

    assert.equal(res.headers.location, undefined)
    let error = res.body.errors[0]
    assert.equal(error.code, 'E_INVALID_REQUEST_BODY')
    assert.deepEqual(error.invalidFields, [
      {
        path: '/message',
        reason: 'required'
      }
    ])
    res = await apiClient.createMessage({
      message: null,
      expectedStatus:400
    })
    error = res.body.errors[0]

    assert.equal(error.code, 'E_INVALID_REQUEST_BODY')
    assert.deepEqual(error.invalidFields, [
      {
        path: '/message',
        reason: 'required'
      }
    ])

  })

})
