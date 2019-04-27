const request = require('supertest')
const expect = require('chai').expect
const seed = require('./seed.json').chapters
const app = require('../../config/polka')
const Chapters = require('../models/chapters.model')

describe('Chapters', () => {

    before((done) => {
        Chapters.remove({})
        Chapters.insertMany(seed, () => {
            done()
        })
    })

    it('GET /chapters/:id it should get all chapters by manga id', (done) => {
        request(app.handler)
            .get('/chapters/5cb15310b426196c969cfcc3')
            .expect(200)
            .then((res) => {
                expect(res.body).to.be.an('object')
                done()
            })
    })

    it('GET /chapters/:id it should get message from not found', (done) => {
        request(app.handler)
            .get('/chapters/5cb15310b426196c969cfcc4s')
            .expect(200)
            .then((res) => {
                expect(res.body).to.be.an('object')
                done() 
            })
    })

    it('GET /not-found-chapter it should get a 404 for not found the route', (done) => {
        request(app.handler)
            .get('/not-found-route')
            .expect(404)
            .then(() => { done() })
    })
})
