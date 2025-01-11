const tableName = 'users';

exports.up = async function (knexInstance) {
    await knexInstance.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    return knexInstance.schema.createTable(tableName, (table) => {
        table.uuid('id').primary().defaultTo(knexInstance.raw('uuid_generate_v4()'));
        table.string('username', 30).notNullable();
        table.string('password', 100).notNullable();
        table.string('email', 100).unique().notNullable();
    });
};

exports.down = async function (knexInstance) {
    return knexInstance.schema.dropTableIfExists(tableName);
};
  