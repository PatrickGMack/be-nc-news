exports.up = function(connection) {
  console.log('Creating Users table...');
  return connection.schema.createTable('users', usersTable => {
    usersTable.string('username').primary();
    usersTable.string('avatar_url');
    usersTable.string('name').notNullable();
  });
};

exports.down = function(connection) {
  console.log('Removing Users table...');
  return connection.schema.dropTable('users');
};
