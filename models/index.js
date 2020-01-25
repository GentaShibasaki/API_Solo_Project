module.exports = function(knex) {
  return {
    sample: require("./sample")(knex),
    // channels: require("./channels")(knex),
    // channelMessages: require("./channelMessages")(knex),
    // userMessages: require("./userMessages")(knex),
  };
};