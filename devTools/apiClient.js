const request = require('supertest')
class APIClient {

  constructor ({protocol, host, port, basePath=''}) {
    this.protocol = protocol
    this.host = host
    this.port = port
    this.basePath = basePath
    this.baseUrl = this.getBaseUrl()
  }

  getBaseUrl() {
    return `${this.protocol}://${this.host}:${this.port}/${this.basePath}`
  }

  async getMessages({expectedStatus = 200}={}) {
    let req = request(this.baseUrl)
      .get('api/messages')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(expectedStatus)
    let resp = await req
    return resp
  }


  async createMessage({message, expectedStatus=201}) {
    let resp = await request(this.baseUrl)
      .post('api/messages')
      .set('Accept', 'application/json')
      .send(message)
      .expect(expectedStatus)
    return resp
  }


  async updateMessage({id, message, expectedStatus=200}) {
    let resp = await request(this.baseUrl)
      .put(`api/messages/${id}`)
      .set('Accept', 'application/json')
      .send(message)
      .expect(expectedStatus)
    return resp
  }


  async getMessageById({id, expectedStatus = 200}){
    let req = request(this.baseUrl)
      .get(`api/messages/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(expectedStatus)
    let resp = await req
    return resp
  }


  async deleteMessage({id, expectedStatus = 204}) {
    let resp = await request(this.baseUrl)
      .delete(`api/messages/${id}`)
      .set('Accept', 'application/json')
      .expect(expectedStatus)
    return resp
  }

}

module.exports = APIClient