const APIClient = require('../../../../devTools/apiClient')
const assert = require('assert')

describe('get message tests', () => {
  let apiClient = APIClient.fromEnv()
  it.only('gets a message', async () =>{
    let createRes = await apiClient.createMessage({
      message: { message: 'Hello world' }
    })

    let res = await apiClient.get({path: createRes.headers.location})
    assert.deepEqual(createRes.body, res.body)
  })

  //TODO test invalid id 

})


