const createServer = require('./createServer')
const config = require('./config')
createServer({port:config.PORT})
