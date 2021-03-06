
exports.up = function(knex, Promise) {
  // create the 'users' table with three columns
  return knex.schema.createTable("sample", (t) => {
    t.increments() // auto-incrementing id column
      .index(); // index this column

    t.string("sampleColumn1", 15) // maximum length of 15 characters
      .unique() // add a unique constraint to this column
      .notNullable(); // add a not-null constraint to this column

    t.string("sampleColumn2", 20); // maximum length of 20 characters

    t.timestamp("created_at")
      .notNullable()
      .defaultTo(knex.fn.now()); // default to the current time
  });
};

exports.down = function(knex, Promise) {
  // undo this migration by destroying the 'users' table
  return knex.schema.dropTable("sample");
};