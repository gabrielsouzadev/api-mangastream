const mongoose = require('mongoose')

const status = ['Ativo', 'Completo']

const mangaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    stars: {
        type: Number,
        required: true,
        index: true
    },
    autor: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: status,
        default: 'Ativo',
        required: true
    },
    description: {
        type: String,
        index: true,
        required: true
    },
    genders: [String]
}, {
    timestamps: true,
})

mangaSchema.index({ stars: -1 })
mangaSchema.index({ title: 'text' })
mangaSchema.index({ title: 'text', genders: 1, }, { weights: { title: 5, genders: 4 } })

module.exports = mongoose.model('Manga', mangaSchema);

