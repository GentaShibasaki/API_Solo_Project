const moment = require("moment");

const Sample = function(dbUser) {
  this.id = dbUser.id;
  this.sampleColumn1 = dbUser.sampleColumn1;
  this.sampleColumn2 = dbUser.sampleColumn2;
  this.createdAt = new Date(dbUser.created_at);
};

Sample.prototype.serialize = function() {
  // we use a serializer to format the object and
  // clean out any information that shouldn't be
  // sent to the client, like passwords, for example.
  return {
    id: this.id,
    sampleColumn1: this.sampleColumn1,
    sampleColumn2: this.sampleColumn2,
    createdAt: moment(this.createdAt).format("hh:mm:ss"),
  };
};

module.exports = (knex) => {
  return {
    create: require("./create")(knex, Sample),
    // list: require("./list")(knex, Sample),
    // get: require("./get")(knex, Sample),
  };
};