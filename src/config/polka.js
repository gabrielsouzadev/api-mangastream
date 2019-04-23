const polka = require('polka')()
const bodyParser = require('body-parser')
const compression = require('compression')
const corsOptions = require('../api/utils/cors')
const cors = require('cors')
const cache = require('../api/middlewares/cache')
const manga = require('../api/controllers/mangas.controller')
const chapters = require('../api/controllers/chapters.controller')
const mongoose = require('./mongo')
const { env } = require('./env')

mongoose.connect()

const app = polka

app.use(compression())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors(corsOptions))

if ( env === 'production') app.use(cache)

app.get('/mangas', manga.get)
app.get('/mangas/:id', manga.getById)
app.get('/chapters/:id', chapters.getById)

module.exports = app;
