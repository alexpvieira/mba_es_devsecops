import app from '../lib/config/app'
import { agent as request } from 'supertest'
import { expect } from 'chai'

describe('Testing users routes', () => {
    let id_user = ''

    it('should POST /api/user', async function () {
        const post_data = {
            "first_name": "Alex",
            "middle_name": "Pereira",
            "last_name": "Vieira",
            "email": "alex@mail.com"
        }

        const res = await request(app).post('/api/user').send(post_data)
        expect(res.status).to.equal(200)
        expect(res.body).not.to.be.empty
        expect(res.body).to.be.an("object")

        id_user = res.body.DATA._id
    })

    it(`should GET /api/user`, async function () {
        const res = await request(app).get(`/api/user/${id_user}`)
        expect(res.status).to.equal(200)
        expect(res.body).not.to.be.empty
        expect(res.body).to.be.an("object")
    })

    it('should PUT /api/user', async function () {
        const post_data = {
            "first_name": "Alex 2",
            "middle_name": "Pereira 2",
            "last_name": "Vieira 2",
            "email": "alex.vieira@mail.com"
        }

        const res = await request(app).put(`/api/user/${id_user}`).send(post_data)
        expect(res.status).to.equal(200)
        expect(res.body).not.to.be.empty
        expect(res.body).to.be.an("object")
    })

    it(`should DELETE /api/user`, async function () {
        const res = await request(app).delete(`/api/user/${id_user}`)
        expect(res.status).to.equal(200)
        expect(res.body).not.to.be.empty
        expect(res.body).to.be.an("object")
    })
})