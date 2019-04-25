const redis = require('redis')
const { cache } = require('../../config/env')
const logger = require('../../config/logger')
const client = redis.createClient(cache.port, cache.host)

client.on('connect', () => {
    logger.info(`Redis conectado na porta ${cache.port}`)
})

client.on('error', (err) => {
    logger.error(`Redis erro ${err}`)
})

Cache = (req, res, next) => {
    let key = req.url

    client.get(key, (err, result) => {
        if (err == null && result != null) {
            res.end(result)
        } else {
            res.endResponse = res.end
            res.end = (body) => {
                client.set(key, body, 'EX', cache.expire, (err, reply) => {
                    if (reply == 'OK')
                        res.endResponse(body)
                })
            }
            next()
        }
    })
}

module.exports = Cache;

