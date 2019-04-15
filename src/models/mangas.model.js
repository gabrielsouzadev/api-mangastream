const mongoose = require('mongoose')

const status = ['Ativo', 'Completo']

const mangaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    stars: {
        type: Number,
        required: true,
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
        required: true
    },
    genders: [String]   
}, {
    timestamps: true,
})

module.exports = mongoose.model('Manga', mangaSchema);

