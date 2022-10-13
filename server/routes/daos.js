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
daoRoutes.route("/dao/add").post(async function (req, response) {

  const mongoClient = dbo.getClient();
  const session = mongoClient.startSession();
  let db_connect = dbo.getDb();

  const original_id = ObjectId()

  let DAOData = {
    name: req.body.name,
    description: req.body.description,
    linkToTerms: req.body.linkToTerms,
    picUri: req.body.picUri,
    members: req.body.members,
    polls: req.body.polls,
    tokenAddress: req.body.tokenAddress,
    tokenType: req.body.tokenType,
    requiredTokenOwnership: req.body.requiredTokenOwnership,
    allowPublicAccess: req.body.allowPublicAccess,
    _id: original_id
  };



  try {
    await session.withTransaction(async () => {
      const coll1 = db_connect.collection('DAOs');
      const coll2 = db_connect.collection('Tokens');
      // Important:: You must pass the session to the operations
      await coll1.insertOne(DAOData, { session });

      await coll2.insertOne(
        {
          tokenAddress: req.body.tokenAddress,
          tokenType: req.body.tokenType,
          symbol: req.body.symbol,
          tokenID: req.body.tokenID,
          daoID: original_id
        }
        , { session })
    }).then(res => response.json(res));
  } catch (e) {
    result = e.Message;
    console.warn(result);
    await session.abortTransaction();
  } finally {
    await session.endSession();
  }

});

module.exports = daoRoutes