const Chapter = require('../models/chapters.model')
const logger = require('../../config/logger')
const send = require('@polka/send-type')

exports.getById = async (req, res, next) => {

    let params = req.params;
    let query = {}

    query.limit = 1

    Chapter.findOne({ manga_id: params.id }, {}, query, (err, data) => {
        if (err) logger.error(err)
        if (!data) data = { message: 'Manga not found' }
        send(res, 200, data)
    }).lean()
}
