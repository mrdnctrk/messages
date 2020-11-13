const express = require('express')
const cors = require('cors')
const config = require('./config')
const messagesRouter = require('./controllers/messages/messagesRouter')
const logger = console
const app = express();


//cors to enable swagger ui
app.use(cors({
  origin: 'http://127.0.0.1:8181'
}))

app.use(express.json());

app.use('/api/messages', messagesRouter)
const server = app.listen(config.PORT, () => {
  logger.info(`API Server listening at http://localhost:${server.address().port}`)
});

