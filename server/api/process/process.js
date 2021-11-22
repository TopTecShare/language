const express = require("express");

const router = express.Router();
const acronym = require("../../models/acronym");

router.post("/", async (req, res) => {
  const getPosition = (string, subString, idx) => {
    return string.split(subString, idx).join(subString).length;
  }
  let words = ` ${req.body.data} `.match(/(\s|,)+[A-Z]+[A-Z]+(\s|,)+/g);
  let list = [];
  let json = [];
  let count;
  let index = 0;
  let index2 = 0;
  for (let word in words) {
    let origin = words[word].match(/[A-Z]+[A-Z]+/g)[0];
    count = list.filter(x => x === origin).length;
    list.push(origin);
    let spellout = 'Your suggestion';
    let user = await acronym.find({ acronym: origin })
    if (user.length > 0) {
      for (let idx in user) {
        json.push(
          {
            origin,
            suggestion: user[idx].spellout,
            index: getPosition(req.body.data, origin, count + 1),
            id: index,
            id2: index2++,
            db: true
          }
        )
      }
    }
    // else
    json.push(
      {
        origin,
        suggestion: spellout,
        index: getPosition(req.body.data, origin, count + 1),
        id: index,
        id2: index2++,
        db: false
      }
    )
    index++;

  }
  // console.log(json);
  res.json(json);
});

module.exports = router;