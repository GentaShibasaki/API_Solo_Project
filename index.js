const config = require("./config");
const express = require("express");

//import all configuration from config file(that is related to DB config)
const knex = require("knex")(config.db);
const models = require("./models")(knex);

//APIs
const { APIs } = require("./apis/api")
const APIs_inUse = APIs(knex);

//pages
APIs_inUse.use(express.static(`${__dirname}/pages`));
//logging every request
// const morgan = require("morgan");
// app.use(morgan("dev"));

APIs_inUse.listen(config.express.port, () => {
  console.log(`Server listening on Port, ${config.express.port}`);
});