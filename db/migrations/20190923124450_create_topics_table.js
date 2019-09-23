exports.up = function(connection) {
  console.log('Creating Topics table...');
  return connection.schema.createTable('topics', topicsTable => {
    topicsTable.string('slug').primary();
    topicsTable.string('description').notNullable();
  });
};

exports.down = function(connection) {
  console.log('Removing Topics table...');
  return connection.schema.dropTable('topics');
};
