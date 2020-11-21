const APIClient = require('../APIClient')
const assert = require('assert')

describe('get messages tests', () => {
  let apiClient = APIClient.fromEnv()

  it('gets messages', async () =>{
    let createRes1 = await apiClient.createMessage({
      message: { message: 'Message1' }
    })
    let createRes2 = await apiClient.createMessage({
      message: { message: 'Message2' }
    })

    let res = await apiClient.getMessages()
    assert.deepEqual(res.body.list.find(m => m.id === createRes1.body.id), createRes1.body)
    assert.deepEqual(res.body.list.find(m => m.id === createRes2.body.id), createRes2.body)
  })

})


