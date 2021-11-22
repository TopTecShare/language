// const Grammarbot = require('grammarbot');

// const bot = new Grammarbot();

// // Callback style
// // bot.check("I can't remember how to go their", function (error, result) {
// //   if (!error) console.log(JSON.stringify(result));
// // });

// // Async/Await style
// const myfunc = async () => {
//   const result = await bot.checkAsync(`I know FIFA, which is my favorite and go school.`);
//   console.log((result));
// };
// myfunc();

const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  const Grammarbot = require('grammarbot');

  const bot = new Grammarbot();
  let json = [];
  let index = 0;
  let index2 = 0;
  const myfunc = async () => {
    const result = await bot.checkAsync(req.body.data);

    result.matches.forEach(element => {
      element.replacements.forEach((e) => {
        json.push(
          {
            origin: req.body.data.substring(element.offset, element.offset + element.length),
            suggestion: e.value,
            index: element.offset,
            id: index,
            id2: index2++,
            db: true
          }
        )
      })
      index++;
    });
    // console.log(json)
    res.json(json);
  };

  myfunc();
});

module.exports = router;
