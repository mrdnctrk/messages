const APIClient = require('../../../../devTools/apiClient')
const createServer = require('../../../../src/createServer')

async function stopServer(server){
  return new Promise((resolve, reject) => {
    server.close(error => {
      if (error) {
        reject(error)
      }
      else {
        resolve()
      }
    })
  })
}


describe('create message tests', () => {
  let server
  before(async ()=>{
    server = await createServer({port:0})
  })

  after(async ()=>{
    await stopServer(server)
  })



  it('creates a message', async () =>{
    let {port} = server.address()
    let apiClient = new APIClient({
      protocol: 'http', //TODO: don't hardcode
      host: 'localhost',//address,
      port
    })

    let res = await apiClient.createMessage({
      message: ''
    })

  })


})
