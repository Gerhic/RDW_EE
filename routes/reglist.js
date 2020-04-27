var express = require("express");
var router = express.Router();
var getRegList = require("../services/db");

/* GET home page. */
router.get("/", function (req, res, next) {
  getRegList((result) => {
    res.render("index", { title: result });
  });
});

module.exports = router;
