var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var cat = require("../models/cat.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  cat.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/cats", function(req, res) {
  cat.create([
    "burger_name", "devoured"
  ], [
    req.body.burger_name, req.body.devoured
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/cats/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  cat.update({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/cats/route", function(req, res) {
  

  cat.delete( function() {
    
       res.status(200).end();
      // res.redirect("/api/cats");
      //res.render("index");
    
  });
});

// Export routes for server.js to use.
module.exports = router;

// app.post("/", function(req, res) {
//   // Test it.
//   // console.log('You sent, ' + req.body.wish);

//   // Test it.
//   // res.send('You sent, ' + req.body.wish)

//   connection.query("INSERT INTO wishes (wish) VALUES (?)", [req.body.wish], function(err, result) {
//     if (err) {
//       throw err;
//     }

//     res.redirect("/api/cats");
//   });
// });
