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
    describe('GET', () => {
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
  describe('/articles', () => {
    describe('GET', () => {
      it('Status 200: Returns an object containing an article with the correct properties', () => {
        return request(app)
          .get('/api/articles/3')
          .expect(200)
          .then(({ body }) => {
            expect(body.article).to.be.an('object');
            expect(body.article).to.contain.keys(
              'author',
              'title',
              'article_id',
              'body',
              'topic',
              'created_at',
              'votes',
              'comment_count'
            );
          });
      });
      it('Status 404: Article not found', () => {
        return request(app)
          .get('/api/articles/300')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal('ERROR: Article not found!');
          });
      });
      it('Status 400: Invalid article ID', () => {
        return request(app)
          .get('/api/articles/thirty')
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal('ERROR: Invalid article ID!');
          });
      });
    });
    describe('PATCH', () => {
      it('Status 201: Responds with updated article once votes have been added', () => {
        const patchData = { inc_votes: 1 };
        return request(app)
          .patch('/api/articles/3')
          .send(patchData)
          .expect(201)
          .then(({ body }) => {
            expect(body.article).to.be.an('object');
            expect(body.article).to.contain.keys(
              'author',
              'title',
              'article_id',
              'body',
              'topic',
              'created_at',
              'votes',
              'comment_count'
            );
            expect(body.article.votes).to.equal(1);
          });
      });
      it('Status 400: No vote object on request body', () => {
        const patchData = { num: 1 };
        return request(app)
          .patch('/api/articles/3')
          .send(patchData)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal('ERROR: Invalid request!');
          });
      });
      it('Status 400: Wrong data type - Invalid request', () => {
        const patchData = { inc_votes: 'One' };
        return request(app)
          .patch('/api/articles/3')
          .send(patchData)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal('ERROR: Invalid request!');
          });
      });
      it('Status 400: Bad request - Another property on body', () => {
        const patchData = { inc_votes: 1, add_to_votes: true };
        return request(app)
          .patch('/api/articles/3')
          .send(patchData)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal('ERROR: Other properties not allowed!');
          });
      });
    });
  });
});
