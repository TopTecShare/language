const express = require("express");

const router = express.Router();
const substitution = require("../../models/substitution");

router.post("/", async (req, res) => {
  const getPosition = (string, subString, idx) => {
    return string.split(subString, idx).join(subString).length;
  }
  let words = ` ${req.body.data} `.match(/[a-z]+/gi);
  let list = [];
  let json = [];
  let count;
  let index = 0;
  let index2 = 0;
  for (let word in words) {
    let origin = words[word];
    count = list.filter(x => x === origin).length;
    list.push(origin);
    let suggestion = 'Your suggestion';
    let user = await substitution.find({ substitution: origin })
    if (user.length > 0) {
      for (let idx in user) {
        json.push(
          {
            origin,
            suggestion: user[idx].suggestion,
            index: getPosition(req.body.data, origin, count + 1),
            id: index,
            id2: index2++,
            db:true
          }
        )
      }
    }
    // else
    //   json.push(
    //     {
    //       origin,
    //       suggestion,
    //       index: getPosition(req.body.data, origin, count + 1),
    //       id: index,
    //       id2: index2++
    //     }
    //   )
    index++;

  }
  // console.log(json);
  res.json(json);
});

module.exports = router;