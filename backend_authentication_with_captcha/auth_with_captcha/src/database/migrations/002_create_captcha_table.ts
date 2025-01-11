const tableNameCaptcha = 'captchas';

exports.up = async function (knexInstance) {
    await knexInstance.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    return knexInstance.schema.createTable(tableNameCaptcha, (table) => {
        table.uuid('id').primary().defaultTo(knexInstance.raw('uuid_generate_v4()'));
        table.string('text', 40).notNullable();
        table.timestamp('expires_at').notNullable();
    });
};

exports.down = async function (knexInstance) {
    return knexInstance.schema.dropTableIfExists(tableNameCaptcha);
};
  