const MongoUUID = require('uuid-mongodb');
class MessageRepository {
  constructor(db) {
    this.db = db
    this._collName = 'messages'
    this._messagesColl = db.collection(this._collName)
  }

  async insertMessage({message}) {
    let doc = {
      _id : MongoUUID.from(message.id),
      message: message.message,
      createdAt: new Date(message.createdAt),
      updatedAt: new Date(message.updatedAt),
      isPalindrome: message.isPalindrome
    }

    let res = await this._messagesColl.insertOne(doc)

    doc = res.ops[0]
    return {
      id: doc._id.toString(),
      message: doc.message,
      createdAt : message.createdAt,
      updatedAt: message.updatedAt,
      isPalindrome: message.isPalindrome
    }

  }
}


module.exports = MessageRepository
