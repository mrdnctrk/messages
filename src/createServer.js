const express = require('express')
const messagesRouter = require('./controllers/messages/messagesRouter')
const healthRouter = require('./controllers/health/healthRouter')
const unknownEndpointHandler = require('./middleware/unknownEndpointHandler')
const errorHandler = require('./middleware/errorHandler')
const path = require('path')
const logger = console

function createServer({port}) {
  return new Promise((resolve, reject) => {
    try {
      const app = express();
      //serve api schemas and swagger-ui
      app.use('/schemas', express.static(path.join(__dirname, './apischemas')))
      app.use('/docs', express.static(path.join(__dirname,'../swagger-ui/site')))

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

