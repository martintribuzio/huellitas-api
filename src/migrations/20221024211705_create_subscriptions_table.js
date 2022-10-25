/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('subscriptions', function(t) {
        t.increments('id').unsigned().primary();
        t.integer('user_id').unsigned();
        t.string('endpoint').notNull();
        t.string('public_key').notNull();
        t.string('auth_token').notNull();
        t.timestamps(false, true);

        t.foreign('user_id').references('users.id').deferrable('deferred').onDelete('cascade');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('subscriptions');
};

// {
//     "endpoint": "https://some.pushservice.com/something-unique",
//     "keys": {
//       "p256dh":
//   "BIPUL12DLfytvTajnryr2PRdAgXS3HGKiLqndGcJGabyhHheJYlNGCeXl1dn18gSJ1WAkAPIxr4gK0_dQds4yiI=",
//       "auth":"FPssNDTKnInHVndSTdbKFw=="
//     }
//   }