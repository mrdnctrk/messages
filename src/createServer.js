const express = require('express')
const cors = require('cors')
const messagesRouter = require('./controllers/messages/messagesRouter')
const logger = console


function createServer({port}) {
  return new Promise((resolve, reject) => {
    try {
      const app = express();
      //cors to enable swagger ui
      app.use(cors({
        origin: 'http://127.0.0.1:8181'
      }))

      app.use(express.json());

      app.use('/api/messages', messagesRouter)



      const server = app.listen(port, () => {
        logger.info(`API Server listening at http://localhost:${server.address().port}`)
        resolve(server)
      });
    } catch(e) {
      reject(e)
    }
  })
}


module.exports = createServer
