const redis = require('redis')
const { cache } = require('../../config/env')
const logger = require('../../config/logger')
const client = redis.createClient(cache.port)

client.on('connect', () => {
    logger.info(`Redis conectado na porta ${cache.port}`)
})

client.on('error', (err) => {
    logger.error(`Redis erro ${err}`)
})

Cache = (req, res, next) => {
    let key = req._queryStr
    if (req._path.params) key = req._path.params.id
    client.get(key, (err, result) => {
        if (err == null && result != null) {
            res.send(result)
        } else {
            res.sendResponse = res.send
            res.send = (body) => {
                client.set(key, JSON.stringify(body), 'EX', cache.expire, (err, reply) => {
                    if (reply == 'OK')
                        res.sendResponse(body)
                })
            }
            next()
        }
    })
}

module.exports = Cache;

