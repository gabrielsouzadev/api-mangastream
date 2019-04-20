const Manga = require('../models/mangas.model')
const logger = require('../../config/logger')
const queryString = require('query-string')

exports.get = async (req, res, next) => {

    req.query = queryString.parse(req._queryStr)

    let page_n = parseInt(req.query.page) || 1
    let size = parseInt(req.query.size) || 20

    let query = {}
    let filter = {}

    let gender = req.query.genders
    let search = req.query.search
    let ids = req.query.ids

    if (gender) filter['genders'] = { $in : gender.split(',') }
    if (search) filter['$text'] = { $search : search }
    if (ids) filter['_id'] = { $in : ids.split(',') }

    query.skip = size * (page_n - 1)
    query.limit = size

    Manga.find(filter, { description: 0, thumb: 0, autor: 0, artist: 0 }, query, (err, data) => {
        if (err) logger.error(err)
        res.send(data)
    }).lean()
}

exports.getById = async (req, res, next) => {

    let params = req._path.params;
    let query = {}

    query.limit = 1

    Manga.findOne({ _id: params.id }, { thumb: 0 }, query, (err, data) => {
        if (err) logger.error(err)
        res.send(data)
    }).lean()
}
