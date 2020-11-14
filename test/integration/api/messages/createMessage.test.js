const APIClient = require('../../../../devTools/apiClient')
const assert = require('assert')

describe('create message tests', () => {
  let apiClient = APIClient.fromEnv()

  it.only('creates a message', async () =>{
    let res = await apiClient.createMessage({
      message: 'Hello world'
    })

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
      message: 'rotator'
    })

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
      expedtedStatus:400})

    assert.equal(res.body.code, 'E_INVALID_REQUEST_PARAM')
    assert.equal(res.body.params, ['message'])
    //TODO: validate error message?
    res = await apiClient.createMessage({
      message: null,
      expedtedStatus:400
    })

    assert.equal(res.body.code, 'E_INVALID_REQUEST_PARAM')
    assert.equal(res.body.params, ['message'])
  })

})
