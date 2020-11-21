const APIClient = require('../APIClient')
const assert = require('assert')

describe('delete message tests', () => {
  let apiClient = APIClient.fromEnv()

  it('deletes a message', async () =>{
    let createRes1 = await apiClient.createMessage({
      message: { message: 'Message to delete' }
    })
    let createRes2 = await apiClient.createMessage({
      message: { message: 'Message2' }
    })

    await apiClient.delete({path: createRes1.headers.location})

    //second resource should still be there
    await apiClient.get({path: createRes2.headers.location})

  })

  it('responds with error for not exiting resource', async () =>{
    let notExistingId = 'ebe18f12-0dc9-4bab-b9fd-8a9c45477b45'

    let res = await apiClient.deleteMessage({
      id: notExistingId,
      expectedStatus: 404
    })

    let [error] = res.body.errors
    assert.equal(error.code, 'E_RESOURCE_NOT_FOUND')
    assert.equal(error.resourceId, notExistingId)
  })


})


