const APIClient = require('../../../../devTools/apiClient')
const assert = require('assert')

//TODO: more tests could be added to verify isPalindrome logic
describe('update message tests', () => {
  let apiClient = APIClient.fromEnv()

  it('updates a message', async () =>{
    let createRes = await apiClient.createMessage({
      message: { message: 'Hello world' }
    })

    let res = await apiClient.put({
      path: createRes.headers.location,
      body: {
        message: 'Racecar',
      }
    })
    let body = res.body
    assert.equal(body.message, 'Racecar')
    assert.equal(body.id, createRes.body.id)
    assert.equal(body.createdAt, createRes.body.createdAt)
    assert.ok(body.createdAt <= body.updatedAt)
    assert.equal(typeof body.updatedAt, 'number')
    assert.equal(body.isPalindrome, true)
  })

  it('responds with error for not existing id', async() => {
    let notExistingId = 'ebe18f12-0dc9-4bab-b9fd-8a9c45477b45'
    let res = await apiClient.updateMessage({
      id: notExistingId,
      message: { message: 'cannot update'},
      expectedStatus: 404
    })
    let [error] = res.body.errors
    assert.equal(error.code, 'E_RESOURCE_NOT_FOUND')
    assert.equal(error.resourceId, notExistingId)
  })


  it('responds with error if message field is missing or null', async () =>{
    let createRes = await apiClient.createMessage({
      message: { message: 'rotator' }
    })

    let res = await apiClient.put({
      path: createRes.headers.location,
      body: { },
      expectedStatus: 400
    })

    let error = res.body.errors[0]
    assert.equal(error.code, 'E_INVALID_REQUEST_BODY')
    assert.deepEqual(error.invalidFields, [
      {
        path: '/message',
        reason: 'required'
      }
    ])
    res = await apiClient.put({
      path: createRes.headers.location,
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
