/* eslint-disable no-console */
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();

const config = require("../config");
const knex = require("knex")(config.db);
const { APIs } = require("../apis/api")
const APIs_inUse = APIs(knex);


describe("users", () => {

  describe("DBtest", () => {
    
    it("able to connect to database", () =>{
      knex
        .raw("select 1+1 as result")
        .catch(() => assert.fail("unable to connect to db"))
    });

    it("has run the initial migrations", () =>{
      knex("sample")
        .select()
        .catch(() => assert.fail("users table is not found."))
    });

  }); 

  describe("APItest", () => {

    let request;
    beforeEach(async () => {
      request = chai.request(APIs_inUse);
      await knex("sample").insert({ sampleColumn1: "Genta" });
    });
    afterEach(() => knex("sample").del()); 

    describe("GET /api/get - returning alldata", () => {
      it("should return all data", async () => {
        const res = await request.get("/api/get");
        console.log(res.text);
        res.should.be.json;
      });
    });

    describe("POST /api/post - create a new data", () => {
      it("should create a new data", async () => {
        let newData = {sampleColumn1: "HI!!!", sampleColumn2: "World!"}
        const res = await request.post("/api/post").send(newData);

        res.should.be.json;
        JSON.parse(res.text).sampleColumn1.should.equal("HI!!!");
        JSON.parse(res.text).sampleColumn2.should.equal("World!");
      });
    });

    describe("PUT /api/put - replace a data", () => {
      it("should replace a data", async () => {
        let replaceData = {sampleColumn1: "Whats?", sampleColumn2: "World!"};
        const res = await request.put("/api/put/Genta").send(replaceData);
        console.log(res.text);
        res.should.be.json;
        JSON.parse(res.text).sampleColumn1.should.equal("Whats?");
        JSON.parse(res.text).sampleColumn2.should.equal("World!");
      });
    });

    describe("PATCH /api/patch - change a data", () => {
      it("should change a data", async () => {
        let patchData = {sampleColumn1: "WhoAreYou?"};
        const res = await request.put("/api/put/Genta").send(patchData);
        console.log(res.text);
        res.should.be.json;
        JSON.parse(res.text).sampleColumn1.should.equal("WhoAreYou?");
      });
    });

    describe("DELETE /api/delete - delete a data", () => {
      it("should delete a data", async () => {
        const res = await request.delete("/api/delete/Genta");
        res.text.should.equal("");
      });
    });

  });

  


});