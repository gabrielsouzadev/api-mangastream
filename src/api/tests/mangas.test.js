const request = require('supertest')
const expect = require('chai').expect
const seed = require('./seed.json').data
const app = require('../../config/restana')
const Manga = require('../models/mangas.model')

describe('Mangas', () => {
    let server 
    const service = app

    before((done) => {
        Manga.remove({})
        Manga.insertMany(seed, () => {
            done()
        })
    })

    it('Start service', async () => {
        server = await service.start(3000)
    })

    it('GET /mangas it should get all mangas', (done) => {
        request(server)
            .get('/mangas')
            .expect(200)
            .then((res) => {
                expect(res.body).to.be.an('array')
                expect(res.body).to.have.lengthOf(4)
                done()
            })
    })

    it('GET /mangas?page=0&size=2 it should paginate the result', (done) => {
        request(server)
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
        request(server)
            .get('/mangas')
            .query({ genders: ['ecchi'] })
            .expect(200)
            .then((res) => {
                expect(res.body).to.be.an('array')
                expect(res.body).to.have.lengthOf(1)
                done()
            })
    })
    
    it('GET /mangas?seach=Gekkan Shoujo it should filter the result by title', (done) => {
        request(server)
            .get('/mangas')
            .query({ search: 'Gekkan Shoujo' })
            .expect(200)
            .then((res) => {
                expect(res.body).to.be.an('array')
                expect(res.body).to.have.lengthOf(1)
                done()
            })
    })
})
