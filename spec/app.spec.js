process.env.NODE_ENV = 'test';

const chai = require('chai');
const { expect } = require('chai');
const chaiSorted = require('chai-sorted');
const request = require('supertest');
const app = require('../app');
const connection = require('../db/connection');
chai.use(chaiSorted);

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
      it('Status 405: Method not allowed', () => {
        const invalidMethods = ['patch', 'put', 'delete', 'post'];
        const methodPromises = invalidMethods.map(method => {
          return request(app)
            [method]('/api/topics')
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal('ERROR: Method not allowed!');
            });
        });
        return Promise.all(methodPromises);
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
      it('Status 405: Method not allowed', () => {
        const invalidMethods = ['patch', 'put', 'delete', 'post'];
        const methodPromises = invalidMethods.map(method => {
          return request(app)
            [method]('/api/users/icellusedkars')
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal('ERROR: Method not allowed!');
            });
        });
        return Promise.all(methodPromises);
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
      it('Status 405: Method not allowed', () => {
        const invalidMethods = ['put', 'delete'];
        const methodPromises = invalidMethods.map(method => {
          return request(app)
            [method]('/api/articles/3')
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal('ERROR: Method not allowed!');
            });
        });
        return Promise.all(methodPromises);
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
      it('Status 405: Method not allowed', () => {
        const invalidMethods = ['post', 'put', 'delete'];
        const methodPromises = invalidMethods.map(method => {
          return request(app)
            [method]('/api/articles/3')
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal('ERROR: Method not allowed!');
            });
        });
        return Promise.all(methodPromises);
      });
    });
    describe('/comments', () => {
      describe('POST', () => {
        it('Status 201: Post comment by article ID returning posted comment', () => {
          const postData = { username: 'icellusedkars', body: 'Nice article!' };
          return request(app)
            .post('/api/articles/3/comments')
            .send(postData)
            .expect(201)
            .then(({ body: { addedComment } }) => {
              expect(addedComment.body).to.equal('Nice article!');
              expect(addedComment).to.contain.keys(
                'comment_id',
                'author',
                'body',
                'created_at',
                'votes',
                'article_id'
              );
            });
        });
        it('Status 404: Article not found', () => {
          const postData = { username: 'icellusedkars', body: 'Nice article!' };
          return request(app)
            .post('/api/articles/300/comments')
            .send(postData)
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal('ERROR: Page not found!');
            });
        });
        it('Status 400: Elements missing', () => {
          const postData = { body: 'Nice article!' };
          return request(app)
            .post('/api/articles/3/comments')
            .send(postData)
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal('ERROR: Missing elements!');
            });
        });
        it('Status 400: Invalid elements', () => {
          const postData = { username: '30', body: 'Nice article!' };
          return request(app)
            .post('/api/articles/3/comments')
            .send(postData)
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal('ERROR: Invalid elements!');
            });
        });
        it('Status 405: Method not allowed', () => {
          const invalidMethods = ['patch', 'put', 'delete'];
          const methodPromises = invalidMethods.map(method => {
            return request(app)
              [method]('/api/articles/3/comments')
              .expect(405)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('ERROR: Method not allowed!');
              });
          });
          return Promise.all(methodPromises);
        });
      });
      describe('GET', () => {
        it('Status 200: Returns an array of comment objects from the given article', () => {
          return request(app)
            .get('/api/articles/1/comments')
            .expect(200)
            .then(({ body }) => {
              expect(body).to.be.an('array');
              expect(body[0]).to.be.an('object');
              expect(body[0]).to.contain.keys(
                'comment_id',
                'author',
                'body',
                'created_at',
                'votes'
              );
            });
        });
        // it('Status 200: Returns an array of comment objects ', () => {
        //   return request(app)
        //     .get('/api/articles/1/comments')
        //     .expect(200)
        //     .then(({ body }) => {
        //       expect(body).to.be.an('array');
        //       expect(body[0]).to.be.an('object');
        //       expect(body[0]).to.contain.keys(
        //         'comment_id',
        //         'author',
        //         'body',
        //         'created_at',
        //         'votes'
        //       );
        //     });
        // });
      });
    });
  });
});
