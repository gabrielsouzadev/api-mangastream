const { port, env } = require('./config/env')
const app = require('./config/polka')
const logger = require('./config/logger')

app.listen(port, (err) => {
    if (err) logger.error(err)
    logger.info(`Servidor iniciado na porta ${port} (${env})`)
})

module.exports = app;
