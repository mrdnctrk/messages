const request = require('supertest')
class APIClient {

  constructor ({protocol, host, port}) {
    this.protocol = protocol
    this.host = host
    this.port = port
    this.baseUrl = this.getBaseUrl()
    this.request = request(this.baseUrl)
  }

  getBaseUrl() {
    return `${this.protocol}://${this.host}:${this.port}`
  }

  static fromEnv() {
    return new APIClient({
      protocol: process.env.SERVER_PROTOCOL,
      host: process.env.SERVER_ADDRESS,
      port: process.env.SERVER_PORT,
      basePath: process.env.SERVER_BASE_PATH
    })
  }

  async get({path, expectedStatus=200}) {
    let resp = await this.request
      .get(path)
      .expect(expectedStatus)
    return resp
  }

  async put({path, body, expectedStatus=200}) {
    let resp = await this.request
      .put(path)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(body)
      .expect(expectedStatus)
    return resp
  }

  async delete({path, body, expectedStatus=204}) {
    let resp = await this.request
      .delete(path)
      .set('Accept', 'application/json')
      .send(body)
      .expect(expectedStatus)
    return resp
  }




  async getMessages({expectedStatus = 200}={}) {
    let req = this.request
      .get('/api/messages')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(expectedStatus)
    let resp = await req
    return resp
  }


  async createMessage({message, expectedStatus=201}) {
    let resp = await this.request
      .post('/api/messages')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(message)
      .expect(expectedStatus)
    return resp
  }


  async updateMessage({id, message, expectedStatus=200}) {
    let resp = await this.request
      .put(`/api/messages/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(message)
      .expect(expectedStatus)
    return resp
  }


  async getMessage({id, expectedStatus = 200}){
    let req = this.request
      .get(`/api/messages/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(expectedStatus)
    let resp = await req
    return resp
  }


  async deleteMessage({id, expectedStatus = 204}) {
    let resp = await this.request
      .delete(`/api/messages/${id}`)
      .set('Accept', 'application/json')
      .expect(expectedStatus)
    return resp
  }

}

module.exports = APIClient
