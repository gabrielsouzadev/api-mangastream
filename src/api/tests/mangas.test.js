const request = require('supertest')
const expect = require('chai').expect
const seed = require('./seed.json').mangas
const app = require('../../config/polka')
const Manga = require('../models/mangas.model')

describe('Mangas', () => {

    before((done) => {
        Manga.remove({})
        Manga.insertMany(seed, () => {
            done()
        })
    })

    it('GET /mangas it should get all mangas', (done) => {
        request(app.handler)
            .get('/mangas')
            .expect(200)
            .then((res) => {
                expect(res.body).to.be.an('array')
                expect(res.body).to.have.lengthOf(4)
                done()
            })
    })

    it('GET /mangas?page=0&size=2 it should paginate the result', (done) => {
        request(app.handler)
            .get('/mangas')
            .query({ page: 1, size: 2 })
            .expect(200)
            .then((res) => {
                expect(res.body).to.be.an('array')
                expect(res.body).to.have.lengthOf(2)
                done()
            })
    })

    it('GET /mangas?genders=ecchi it should filter the result by gender', (done) => {
        request(app.handler)
            .get('/mangas')
            .query({ genders: ['ecchi'] })
            .expect(200)
            .then((res) => {
                expect(res.body).to.be.an('array')
                expect(res.body).to.have.lengthOf(1)
                done()
            })
    })
    
    it('GET /mangas?search=Gekkan Shoujo it should filter the result by title', (done) => {
        request(app.handler)
            .get('/mangas')
            .query({ search: 'Gekkan Shoujo' })
            .expect(200)
            .then((res) => {
                expect(res.body).to.be.an('array')
                expect(res.body).to.have.lengthOf(1)
                done()
            })
    })

    it('GET /mangas?search=07 Ghost&genders=militar it should filter the result by title and gender', (done) => {
        request(app.handler)
            .get('/mangas')
            .query({ search: '07 Ghos', genders: ['militar'] })
            .expect(200)
            .then((res) => {
                expect(res.body).to.be.an('array')
                expect(res.body).to.have.lengthOf(1)
                done()
            })
    })
    
    it('GET /not-found-manga it should get a 404 for not found the route', (done) => {
        request(app.handler)
            .get('/not-found-route')
            .expect(404)
            .then(() => { done() })
    })
})
