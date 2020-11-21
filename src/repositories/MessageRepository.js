const MongoUUID = require('uuid-mongodb');
class MessageRepository {
  constructor(db) {
    this.db = db
    this._collName = 'messages'
    this._messagesColl = db.collection(this._collName)
  }
  
  /**
  * Message
  * @typedef {Object} Message
  * @property {string} id - id of the message in uuid format
  * @property {string} message - the message content
  * @property {number} createdAt - timestamp in epoch format representing the creation time of the message
  * @property {number} updatedAt - timestamp in epoch format representing the last update time of the message
  * @property {boolean} isPalindrome - whether the message is a palindrom
  */  
  
  /**
   * Internal method to convert db specific message doc format to a Message object 
   * @param {Object} doc - message doc
   * @returns {Message}
   */
  _docToMessage(doc) {
    return {
      id: MongoUUID.from(doc._id).toString(),
      message: doc.message,
      createdAt : doc.createdAt.valueOf(),
      updatedAt: doc.updatedAt.valueOf(),
      isPalindrome: doc.isPalindrome
    }
  }

    /**
   * Internal method to convert a Message object to db specific message doc
   * @param {Object} param0
   * @param {Message} param0.message - 
   * @param {Message} [fields] - the Message fields that should be included in the returned doc, by defaul all fields are included 
   * @returns {Object} message in the db format 
   */
  _messageToDoc({message, fields}) {
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



  /**
   *
   * Insert the given message to the database
   * @param {Object} args
   * @param {Message} arg.message
   *
   * @returns {Message} inserted message
   */
  async insertMessage({message}) {
    let doc = this._messageToDoc({message})
    let res = await this._messagesColl.insertOne(doc)

    doc = res.ops[0]

    return this._docToMessage(doc)

  }

  async deleteMessage({id}) {
    let _id
    try {
      _id = MongoUUID.from(id)
    } catch(e) {
      //invalid id
      return null
    }

    let res = await this._messagesColl.deleteOne({_id})
    return res.deletedCount > 0
  }

  /**
   * 
   * Retrieves the message with the given id from the db 
   * @param {Object} param0
   * @param {string} param0.id - id of the message to retrieve
   * @returns {Message}  - null if no message is found with that id 
   */
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


  /**
   * Retrieve all messages from the db
   * TODO: add pagination as this pulling everything from db
   * 
   * @returns {Array<Message>}
   */
  async getMessages() {
    let messages = await this._messagesColl.find({}).toArray()
    return messages.map(m => this._docToMessage(m))
  }


  /**
   * Updates the given message
   * @param {Object} param0
   * @param {Message} param0.message
   * @returns {Message}  - null if there is no exiting message with param0.message.id
 a  */
  async updateMessage({message}) {
    let _id
    
    try {
      _id = MongoUUID.from(message.id)
    } catch(e) {
      //invalid id
      return null
    }

    let updateableFields = ['message', 'updatedAt', 'isPalindrome']
    let doc = this._messageToDoc({message, fields:updateableFields})
    let res = await this._messagesColl.findOneAndUpdate({_id}, {
      $set: doc
    }, {
      returnOriginal: false
    })

    if (!res.value) {
      //id doesn't match any existing document
      return null
    }
    return this._docToMessage(res.value)
  }
}


module.exports = MessageRepository
