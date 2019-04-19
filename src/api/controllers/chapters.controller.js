const Chapter = require('../models/chapters.model')
const logger = require('../../config/logger')

exports.getById = async (req, res, next) => {

    let params = req._path.params;
    let query = {}

    query.limit = 1

    Chapter.findOne({ manga_id: params.id }, { 'chapters.pages': 0 }, query, (err, data) => {
        if (err) logger.error(err)
        res.send(data)
    }).lean()
}
