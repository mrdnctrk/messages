const MongoUUID = require('uuid-mongodb');
class MessageRepository {
  constructor(db) {
    this.db = db
    this._collName = 'messages'
    this._messagesColl = db.collection(this._collName)
  }

  _docToMessage(doc) {
    return {
      id: MongoUUID.from(doc._id).toString(),
      message: doc.message,
      createdAt : doc.createdAt.valueOf(),
      updatedAt: doc.updatedAt.valueOf(),
      isPalindrome: doc.isPalindrome
    }
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

    return this._docToMessage(doc)

  }

  async getMessage({id}) {
    try {
      let doc = await this._messagesColl.findOne({_id : MongoUUID.from(id)})
      if (doc === null) {
        return null
      }
      return this._docToMessage(doc)

    } catch(e) {
      console.log(e)
    }
  }
}


module.exports = MessageRepository
