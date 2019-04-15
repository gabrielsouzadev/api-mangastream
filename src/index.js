const { port, env } = require('./config/env')
const app = require('./config/restana')
const logger = require('./config/logger')
const mongoose = require('./config/mongo')

mongoose.connect()

app.start(port).then(() => { 
    logger.info(`Servidor iniciado na porta ${port} (${env})`) 
})

