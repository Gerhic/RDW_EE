var express = require("express");
var router = express.Router();
var db = require("../services/db");

/* GET home page. */
router.get("/", function (req, res, next) {
  db.getRegList((result) => {
    res.render("regList", { title: result });
  });
});

router.post("/", (req, res, next) => {
  console.log(req.body);
  let name = req.body.name;

  if (name) {
    res.render("index", { title: name });
  } else {
    res.render("index", { title: "test123" });
  }
});

module.exports = router;
