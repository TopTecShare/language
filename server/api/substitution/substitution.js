const express = require("express");

const router = express.Router();

const substitution = require("../../models/substitution");

router.get("/", (req, res) => {
  substitution
    .find()
    .then((substitutions) => {
      res.json(substitutions);
    })
    .catch((err) => res.json({ error: "No substitution" }));
});

router.post("/", (req, res) => {
  substitution.findOne({ substitution: req.body.substitution }).then((user) => {
    if (user) res.json({ message: "The substition is already exist." });
    else {
      const newSubstitution = new substitution({
        substitution: req.body.substitution,
        suggestion: req.body.suggestion,
      });
      newSubstitution.save().then((result) => {
        res.json(result);
      });
    }
  })
});

router.delete("/:id", (req, res) => {
  substitution.findOneAndDelete({ _id: req.params.id }, (err, result) => {
    res.json({ msg: "Deleted successfully" });
  });
});

router.post("/update/:id", (req, res) => {
  let myquery = { _id: req.params.id };

  let newvalues = {
    $set: {
      substitution: req.body.substitution,
      suggestion: req.body.suggestion,
    },
  };
  substitution.updateOne(myquery, newvalues, function (err, user) {
    if (err) res.json({ message: err });
    res.json(req.body);
  });
});

module.exports = router;
