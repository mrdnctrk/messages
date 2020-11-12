const express = require('express')
const config = require('./config')

const logger = console
const app = express();
app.use(express.json());

const server = app.listen(config.PORT, () => {
  logger.info(`API Server listening at http://localhost:${server.address().port}`)
});

