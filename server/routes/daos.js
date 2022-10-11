const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const daoRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
daoRoutes.route("/daos").get(function (req, res) {
  let db_connect = dbo.getDb("Lite");
  db_connect
    .collection("DAOs")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
daoRoutes.route("/daos/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let id = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("DAOs")
    .findOne(id, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you update a record by id.
daoRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let id = { _id: ObjectId(req.params.id) };
  let data = {
    $set: {
      members: req.body
    },
  };
  db_connect
    .collection("DAOs")
    .updateOne(id, data, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you create a new record.
daoRoutes.route("/dao/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let data = {
    name: req.body.name,
    description: req.body.description,
    linkToTerms: req.body.linkToTerms,
    tokenAddress: req.body.tokenAddress,
    members: req.body.members,
    polls: req.body.polls,
    tokenType: req.body.tokenType,
    picUri: req.body.picUri,
  };
  db_connect.collection("DAOs").insertOne(data, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

module.exports = daoRoutes