const server = require('restana/libs/turbo-http')
const anumargak = require('anumargak')
const service = require('restana')({ 
    server, 
    routerFactory: (options) => {
        return anumargak(options)
    }
})
const bodyParser = require('body-parser')
const corsOptions = require('../api/utils/cors')
const cors = require('cors')
const cache = require('../api/middlewares/cache')
const manga = require('../api/controllers/mangas.controller')
const chapters = require('../api/controllers/chapters.controller')

const app = service

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors(corsOptions))

app.get('/mangas', cache, manga.get)
app.get('/mangas/:id', cache, manga.getById)
app.get('/chapters/:id', cache, chapters.getById)

module.exports = app;
