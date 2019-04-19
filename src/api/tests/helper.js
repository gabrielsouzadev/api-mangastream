const mongoose = require('mongoose')
const { mongodb } = require('../../config/env')

mongoose.Promise = global.Promise

mongoose.connect(mongodb)

mongoose.connection
    .once('open', () => console.log('Connected !'))
    .on('error', (error) => {
        console.error('Error : ', error)
    })


