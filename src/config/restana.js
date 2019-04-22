const anumargak = require('anumargak')
const service = require('restana')({ routerFactory: (options) => { return anumargak(options) } })
const bodyParser = require('body-parser')
const corsOptions = require('../api/utils/cors')
const cors = require('cors')
const cache = require('../api/middlewares/cache')
const manga = require('../api/controllers/mangas.controller')
const chapters = require('../api/controllers/chapters.controller')
const error = require('../api/utils/error')
const mongoose = require('./mongo')
const { env } = require('./env')

mongoose.connect()

const app = service

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// app.use(cors(corsOptions))

app.use(error)

if ( env === 'production') app.use(cache)

app.get('/mangas', manga.get)
app.get('/mangas/:id', manga.getById)
app.get('/chapters/:id', chapters.getById)

module.exports = app;
