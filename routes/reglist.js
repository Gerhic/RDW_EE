var express = require("express");
var router = express.Router();
var db = require("../services/db");

router.get("/", function (req, res, next) {
  onGetRegList(res);
});

router.post("/", (req, res, next) => {
  console.log(req.body);
  let name = req.body.name;

  if (name) {
    db.insertNewName(name, () => {
      onGetRegList(res, true);
    });
  } else {
    res.render("index", { title: "failed" });
  }
});

function onGetRegList(res, hideSubmit) {
  db.getRegList((result) => {
    res.render("regList", { data: JSON.stringify(result), hideSubmit: hideSubmit });
  });
}

module.exports = router;
