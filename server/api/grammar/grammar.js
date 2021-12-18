const request = require('request');

const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {

  let json = [];
  let index = 0;
  let index2 = 0;


  const options = {
    method: 'POST',
    url: 'https://grammarbot.p.rapidapi.com/check',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'x-rapidapi-host': 'grammarbot.p.rapidapi.com',
      'x-rapidapi-key': '75bd1424aemshfcbb450600ee3d4p1794c2jsne0bf7953c8a3',
      useQueryString: true
    },
    form: { text: req.body.data, language: 'en-US' }
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    const result = JSON.parse(body);
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

    res.json(json);
  });



});

module.exports = router;
