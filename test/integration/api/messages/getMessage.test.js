const APIClient = require('../APIClient')
const assert = require('assert')

describe('get message tests', () => {
  let apiClient = APIClient.fromEnv()
  it('gets a message', async () =>{
    let createRes = await apiClient.createMessage({
      message: { message: 'Hello world' }
    })

    let res = await apiClient.get({path: createRes.headers.location})
    assert.deepEqual(createRes.body, res.body)
  })

  it('requests not existing message', async() => {
    let notExistingId = 'ebe18f12-0dc9-4bab-b9fd-8a9c45477b45'
    let res = await apiClient.getMessage({id: notExistingId, expectedStatus: 404})
    let [error] = res.body.errors
    assert.equal(error.code, 'E_RESOURCE_NOT_FOUND')
    assert.equal(error.resourceId, notExistingId)
  })

  it('requests with invalid id', async() => {
    let invalidId = null
    let res = await apiClient.getMessage({id: invalidId, expectedStatus: 404})
    let [error] = res.body.errors
    assert.equal(error.code, 'E_RESOURCE_NOT_FOUND')
    assert.equal(error.resourceId, 'null')
  })

})


