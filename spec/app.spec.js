process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');
const connection = require('../db/connection');

/* SEED */
beforeEach(() => connection.seed.run());

/* DESTROY */
after(() => connection.destroy());

describe('/api', () => {
  it('Status 404: Responds with "ERROR: Page not found!"', () => {
    return request(app)
      .get('/topsci')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).to.equal('ERROR: Page not found!');
      });
  });
  describe('/topics', () => {
    describe('GET', () => {
      it('Status 200: Responds with an array of all topics with correct properties', () => {
        return request(app)
          .get('/api/topics')
          .expect(200)
          .then(({ body }) => {
            expect(body.topics).to.be.an('array');
            expect(body.topics[0]).to.contain.keys('description', 'slug');
          });
      });
    });
  });
  describe('/users', () => {
    describe('/GET', () => {
      it('Status 200: Responds with an array containing an object of the selected user', () => {
        return request(app)
          .get('/api/users/icellusedkars')
          .expect(200)
          .then(({ body }) => {
            expect(body.user).to.be.an('object');
            expect(body.user).to.contain.keys('username', 'name', 'avatar_url');
          });
      });
      it('Status 404: User not found', () => {
        return request(app)
          .get('/api/users/notausername')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal('ERROR: User not found!');
          });
      });
      it('Status 400: Invalid username', () => {
        return request(app)
          .get('/api/users/20')
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal('ERROR: Invalid username!');
          });
      });
    });
  });
});
