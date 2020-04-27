var express = require("express");
var router = express.Router();
var db = require("../services/db");

router.get("/", function (req, res, next) {
  var cookie = req.cookies.test1;
  if (cookie === undefined) {
    onGetRegList(res);
  } else {
    onGetRegList(res, true);
  }
});

router.post("/", (req, res, next) => {
  console.log(req.body);
  let name = req.body.name;

  if (name) {
    db.insertNewName(name, () => {
      res.cookie("test1", true, {
        maxAge: 900000,
        httpOnly: true,
      });
      console.log("cookie created successfully");

      onGetRegList(res, true);
    });
  } else {
    res.render("index", { title: "failed" });
  }
});

function onGetRegList(res, hideSubmit) {
  db.getRegList((result) => {
    res.render("regList", {
      data: result,
      title: "3.04 MTG modern webcam tournament",
      hideSubmit: hideSubmit,
    });
  });
}

module.exports = router;
