const express = require("express");
const APIs = (knex) => {
  const app = express();
  const bodyParser = require("body-parser");
  app.use(bodyParser.json({ type: "application/json", limit: "50mb" }));
  app.use(express.urlencoded({extended: true}));

    app.get("/api/get", (req, res) => {
      knex("sample")
        .select()
        .then((alldata) => res.send(alldata))
        .catch((err) => {
          res.send(err);
        })
      });

      app.post("/api/post", (req, res) => {
        console.log(req.body);
        console.log(req.route.path);
        if(req.route.path = "/api/put") next();

        knex("sample")
          .insert({ 
            sampleColumn1: req.body.sampleColumn1, 
            sampleColumn2: req.body.sampleColumn2})
          .then(() => { 
            return knex("sample") 
              .where({ sampleColumn1: req.body.sampleColumn1})
              .select();
          })
          .then((sample) =>{
            res.send(sample.pop())})
          .catch((err) => {
            res.send(err);
          })
      });

      app.post("/api/put", (req, res, next) => {
        console.log("AAAAA");
        if(req.route.path = "/api/put") req.app.put(req.route.path);
      });

      app.put("/api/put", (req, res) => {
        console.log("HIHI");
        console.log(req.body);
        console.log(req.params.key);
        knex('sample')
        .where('sampleColumn1', req.params.key)
        .update({
          sampleColumn1: req.body.sampleColumn1,
          sampleColumn2: req.body.sampleColumn2
        })
        .then(() => {
          return knex("sample") 
            .where({ sampleColumn1: req.body.sampleColumn1})
            .select();
        })
        .then((sample) =>{
          res.send(sample.pop())})
        .catch((err) => {
          res.send(err);
        })

      });

      app.patch("/api/patch/:key", (req, res) => {
        knex('sample')
        .where('sampleColumn1', req.params.key)
        .update({
          sampleColumn1: req.body.sampleColumn1,
        })
        .then(() => {
          return knex("sample") 
            .where({ sampleColumn1: req.body.sampleColumn1})
            .select();
        })
        .then((sample) =>{
          res.send(sample.pop())})
        .catch((err) => {
          res.send(err);
        })
      });

      app.delete("/api/delete/:key", (req, res) => {
        knex('sample')
        .where('sampleColumn1', req.params.key)
        .del()
        .then(()=>{
          return knex("sample") 
            .select();
        })
        .then((data) =>{ 
          res.send(data.pop())
        })
        .catch((err) => {
          res.send(err);
        })
      });


  return app;
}

module.exports = {APIs};