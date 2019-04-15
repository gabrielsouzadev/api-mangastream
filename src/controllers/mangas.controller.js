const Manga = require('../models/mangas.model')
const queryString = require('query-string')

exports.get = async (req, res, next) => {

    req.query = queryString.parse(req._queryStr)

    let page_n = parseInt(req.query.page) || 1
    let size = parseInt(req.query.size) || 20

    let query = {}

    query.skip = size * (page_n - 1)
    query.limit = size

    Manga.find({}, { description: 0, thumb: 0 }, query, (err, data) => {
        res.send(data)
    })
}

exports.getById = async (req, res, next) => {}
