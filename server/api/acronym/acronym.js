const express = require("express");

const router = express.Router();

const acronym = require("../../models/acronym");

router.get("/", (req, res) => {
  acronym
    .find()
    .then((acronyms) => {
      res.json(acronyms);
    })
    .catch((err) => res.json({ error: "No acronym" }));
});

router.post("/", (req, res) => {
  const newAcronym = new acronym({
    acronym: req.body.acronym,
    spellout: req.body.spellout,
  });
  newAcronym.save().then((result) => {
    res.json(result);
  });
  // acronym.findOne({ acronym: req.body.acronym }).then((user) => {
  //   if (user) res.json({ message: "The acronym is already exist." });
  //   else {

  //   }
  // })
});

router.delete("/:id", (req, res) => {
  acronym.findOneAndDelete({ _id: req.params.id }, (err, result) => {
    res.json({ msg: "Deleted successfully" });
  });
});

router.post("/update/:id", (req, res) => {
  let myquery = { _id: req.params.id };

  let newvalues = {
    $set: {
      acronym: req.body.acronym,
      spellout: req.body.spellout,
    },
  };
  acronym.updateOne(myquery, newvalues, function (err, user) {
    if (err) res.json({ message: err });
    res.json(req.body);
  });
});

module.exports = router;
