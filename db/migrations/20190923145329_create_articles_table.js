exports.up = function(connection) {
  console.log('Creating Articles table...');
  return connection.schema.createTable('articles', articlesTable => {
    articlesTable.increments('article_id').primary();
    articlesTable.string('title').notNullable();
    articlesTable.text('body').notNullable();
    articlesTable.integer('votes').defaultTo(0);
    articlesTable.string('topic').references('topics.slug');
    articlesTable.string('author').references('users.username');
    articlesTable.timestamp('created_at').defaultTo(connection.fn.now());
  });
};

exports.down = function(connection) {
  console.log('Removing Articles table...');
  return connection.schema.dropTable('articles');
};
