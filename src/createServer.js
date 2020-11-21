const express = require('express')
const cors = require('cors')
const messagesRouter = require('./controllers/messages/messagesRouter')
const healthRouter = require('./controllers/health/healthRouter')
const unknownEndpointHandler = require('./middleware/unknownEndpointHandler')
const errorHandler = require('./middleware/errorHandler')
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

      //add routes
      app.use('/api/messages', messagesRouter)
      app.use('/api/health', healthRouter)

      //handle request that doesn't match any endpoint
      //this should be the last in the routing
      app.use(unknownEndpointHandler)
      app.use(errorHandler)

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

