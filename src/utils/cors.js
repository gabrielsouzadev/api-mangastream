const { env, domain } = require('../config/env')

let corsOptions = {}

if (env == 'production') {
    var whitelist = [domain]

    corsOptions = {
        origin: (origin, callback) => {
            if (whitelist.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        }
    }
}

module.exports = corsOptions;
