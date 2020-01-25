const express = require("express");
const APIs = (knex) => {
  const app = express();

  app.use(express.json());

    app.get("/api/get", (req, res) => {
      knex("sample")
        .select()
        .then((alldata) => res.send(alldata))
        .catch((err) => {
          res.send(err);
        })
      });

      app.post("/api/post", (req, res) => {
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

      app.put("/api/put/:key", (req, res) => {
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