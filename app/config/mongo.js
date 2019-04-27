const mongoose = require('mongoose')
const logger = require('./logger')
const { mongodb, env } = require('./env')

mongoose.connection.on('error', (err) => {
    logger.error(`MongoDB connection error: ${err}`)
})

if (env == 'dev') {
    mongoose.set('debug', true)
}

mongoose.set('useCreateIndex', true)

exports.connect = () => {
    mongoose.connect(mongodb, { keepAlive: 1, useNewUrlParser: true })
    return mongoose.connection
}
