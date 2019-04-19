const mongoose = require('mongoose')

const chaptersSchema = new mongoose.Schema({
    manga_id: {
        type: String,
        required: true,
        index: true
    },
    chapters: [{
        chapter: {
            type: Number,
        },
        pages: [String],
    }]
})

chaptersSchema.index({ manga_id: 1 })

module.exports = mongoose.model('Chapters', chaptersSchema);
