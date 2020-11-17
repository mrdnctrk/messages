class MessageRepository {
  constructor(db) {
    debugger
    this.db = db
    this._collName = 'messages'
    this._messagesColl = db.collection(this._collName)
  }

  async insertMessage({message}) {
    console.log('message:'+JSON.stringify(message))
    let res = await this._messagesColl.insertOne(message)
    console.log('res:'+JSON.stringify(res))
  }

}

module.exports = MessageRepository
