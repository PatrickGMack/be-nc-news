# Northcoders News Backend API

By [Patrick Mackintosh](https://github.com/PatrickGMack)

# Motivation

This is the frontend to an end to end Northcoders News website, developed over 2 weeks during an intensive coding bootcamp.

This API acts as both the backend, and the database to the news websites frontend, viewable here: https://nc-news-patrick.netlify.com/.

# Using the Repo

To use install this repo locally, fork and clone this project to your computer. To install the necessary dependencies, run the following command in the terminal:

```
npm install
```

Additionally, if you wish to use PostgreSQL, this must also be installed on your computer.

The repo has the following commands to use:

```
npm run setup-dbs
```

This will build the database.

```
npm run seed
```

This will seed the database.

```
npm run dev
```

This will run the server locally. If this is successful, you should see a console log of:

```http
`Listening on port 3000...`
```

# Using the API

This backend has the following endpoints:

```http
GET /api/topics

GET /api/users/:username

GET /api/articles/:article_id
PATCH /api/articles/:article_id

POST /api/articles/:article_id/comments
GET /api/articles/:article_id/comments

GET /api/articles

PATCH /api/comments/:comment_id
DELETE /api/comments/:comment_id


```

---

```http
GET /api/topics
```

#### Responds with

- an array of topic objects, each of which have the following properties:
  - `slug`
  - `description`

---

```http
GET /api/users/:username
```

#### Responds with

- a user object which has the following properties:
  - `username`
  - `avatar_url`
  - `name`

---

```http
GET /api/articles/:article_id
```

#### Responds with

- an article object, which has the following properties:

  - `author` which is the `username` from the users table
  - `title`
  - `article_id`
  - `body`
  - `topic`
  - `created_at`
  - `votes`
  - `comment_count`

---

```http
PATCH /api/articles/:article_id
```

#### Request body accepts

- an object in the form `{ inc_votes: newVote }`

  - `newVote` indicates how much the `votes` property in the database has been updated by

  e.g.

  `{ inc_votes : 1 }` will increment the current article's vote property by 1

  `{ inc_votes : -100 }` will decrement the current article's vote property by 100

#### Responds with

- the updated article

---

```http
POST /api/articles/:article_id/comments
```

#### Request body accepts

- an object with the following properties:
  - `username`
  - `body`

#### Responds with

- the posted comment

---

```http
GET /api/articles/:article_id/comments
```

#### Responds with

- an array of comments for the given `article_id` of which each comment will have the following properties:
  - `comment_id`
  - `votes`
  - `created_at`
  - `author`
  - `body`

#### Accepts queries

- `sort_by`, which sorts the comments by any valid column (defaults to created_at)
- `order`, which can be set to `asc` or `desc` for ascending or descending (defaults to descending)

---

```http
GET /api/articles
```

#### Responds with

- an `articles` array of article objects, each of which will have the following properties:
  - `author` which is the `username` from the users table
  - `title`
  - `article_id`
  - `topic`
  - `created_at`
  - `votes`
  - `comment_count`

#### Accepts the following queries

- `sort_by`, which sorts the articles by any valid column (defaults to date)
- `order`, which can be set to `asc` or `desc` for ascending or descending (defaults to descending)
- `author`, which filters the articles by the username value specified in the query
- `topic`, which filters the articles by the topic value specified in the query

---

```http
PATCH /api/comments/:comment_id
```

#### Request body accepts

- an object in the form `{ inc_votes: newVote }`

  - `newVote` will indicate how much the `votes` property in the database should be updated by

  e.g.

  `{ inc_votes : 1 }` will increment the current article's vote property by 1

  `{ inc_votes : -1 }` will decrement the current article's vote property by 1

#### Responds with

- the updated comment

---

```http
DELETE /api/comments/:comment_id
```

#### Will

- delete the given comment by `comment_id`

#### Responds with

- status 204 and no content

# Tech Used

**Express JS** is used as the framework of the server, view the docs here: https://expressjs.com/

**PostgreSQL** is the relational database used to store data, view the docs here: https://www.postgresql.org/

**KNEX.JS** is used as the query builder to make requests, view the docs here: http://knexjs.org/

**Mocha** is used as the test framework of the project, view the docs here: https://mochajs.org/

**Chai** is used as an assertion library, view the docs here: https://www.chaijs.com/

**Supertest** is used to test HTTP requests, view the docs here: https://www.npmjs.com/package/supertest

**Nodemon** is used to restart the server upon changes and updates to the code, view the docs here: https://nodemon.io/
