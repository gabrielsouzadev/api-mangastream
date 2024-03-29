const path = require('path')
const dotenv = require('dotenv')

dotenv.config({
    path: path.join(__dirname, '../../../.env'),
    debug: process.env.DEBUG
})

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    mongodb: process.env.NODE_ENV === 'test' ? process.env.MONGO_DB_TESTS : process.env.MONGO_DB,
    domain: process.env.DOMAIN,
    cache: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        expire: process.env.REDIS_EXPIRE
    }
};
