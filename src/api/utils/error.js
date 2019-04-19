const error = async (req, res, next) => {
    res.on('response', e => {
        if (e.code >= 400) {
            if (e.data && e.data.errClass) {
                console.log(e.data.errClass + ': ' + e.data.message)
            } else {
                console.log('error response, but not triggered by an Error instance')
            }
        }
    })

    return next()
}

module.exports = error;
