const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);
const expect = chai.expect;

describe('User API', () => {
    let createdUserId;

    it('should create a new user', async () => {
        const user = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            age: 25,
            country: 'USA',
            mobile: '01158209429',
        };

        const res = await chai.request(app).post('/api/users').send(user);
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('id');
        expect(res.body.name).to.equal(user.name);

        createdUserId = res.body.id;
    });

    it('should return a list of users', async () => {
        const res = await chai.request(app).get('/api/users');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
    });

    it('should update an existing user', async () => {
        const updatedUserData = {
            name: 'Updated Name',
            email: 'updated.email@example.com',
            age: 30,
            country: 'Canada',
            mobile: '+1 987-654-3210',
        };

        const res = await chai.request(app).put(`/api/users/${createdUserId}`).send(updatedUserData);
        expect(res).to.have.status(200);
        expect(res.body.name).to.equal(updatedUserData.name);
        expect(res.body.email).to.equal(updatedUserData.email);
        expect(res.body.age).to.equal(updatedUserData.age);
        expect(res.body.country).to.equal(updatedUserData.country);
        expect(res.body.mobile).to.equal(updatedUserData.mobile);
    });

    it('should fail to update a user with an invalid ID', async () => {
        const invalidUserId = 'invalidId';
        const res = await chai.request(app).put(`/api/users/${invalidUserId}`).send({});
        expect(res).to.have.status(400);
    });

    it('should delete an existing user', async () => {
        const res = await chai.request(app).delete(`/api/users/${createdUserId}`);
        expect(res).to.have.status(204);
    });

    it('should fail to delete a user with an invalid ID', async () => {
        const invalidUserId = 80;
        const res = await chai.request(app).delete(`/api/users/${invalidUserId}`);
        expect(res).to.have.status(404);
    });

});
