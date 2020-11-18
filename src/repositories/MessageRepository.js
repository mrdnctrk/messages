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

  _messageToDoc(message, fields) {
    let doc = { }
    const keys = fields || Object.keys(message)
    for (let key of keys) {
      let value = message[key]
      switch(key){
        case 'id':
          doc._id = MongoUUID.from(value)
          break
        case 'message':
          doc.message = value
          break
        case 'createdAt':
          doc.createdAt = new Date(value)
          break
        case 'updatedAt':
          doc.updatedAt = new Date(value)
          break
        case 'isPalindrome':
          doc.isPalindrome = value
          break
      }
    }
    return doc
  }

  async insertMessage({message}) {
    let doc = this._messageToDoc(message)
    let res = await this._messagesColl.insertOne(doc)

    doc = res.ops[0]

    return this._docToMessage(doc)

  }

  async getMessage({id}) {
    let _id
    try {
      _id = MongoUUID.from(id)
    } catch(e) {
      //invalid id
      return null
    }
    let doc = await this._messagesColl.findOne({_id})
    if (doc === null) {
      return null
    }
    return this._docToMessage(doc)
  }



  async updateMessage({message}) {
    let _id
    try {
      _id = MongoUUID.from(message.id)
    } catch(e) {
      //invalid id
      return null
    }

    let updateableFields = ['message', 'updatedAt', 'isPalindrome']
    let doc = this._messageToDoc(message, updateableFields)
    let res = await this._messagesColl.findOneAndUpdate({_id}, {
      $set: doc
    }, {
      returnOriginal: false
    })

    //TODO: investigate error handling
    //res:{"lastErrorObject":{"n":1,"updatedExisting":true},"value":{"_id":"D/WJmlzYTRCa/dUdrKymxQ==","message":"Racecar","createdAt":"2020-11-18T17:14:04.382Z","updatedAt":"2020-11-18T17:14:04.413Z","isPalindrome":true},"ok":1}
    if (!res.value) {
      //id doesn't match any existing document
      return null
    }
    return this._docToMessage(res.value)
  }
}


module.exports = MessageRepository
