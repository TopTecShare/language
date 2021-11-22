const express = require("express");
const CryptoJS = require('crypto-js')

const userModel = require("../../models/user");

const router = express.Router();

function encryptPassword(password) {
  return CryptoJS.AES.encrypt(password, 'my-secret-key@123').toString();
}

function decryptPassword(password) {
  const bytes = CryptoJS.AES.decrypt(password, 'my-secret-key@123');
  // console.log(bytes.toString(CryptoJS.enc.Utf8))
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

router.post("/add-user", (req, res) => {
  let pwd = encryptPassword(req.body.password);
  const userData = new userModel({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: pwd,
    phonenumber: req.body.phonenumber,
    role: req.body.role,
  });
  userData.save().then((user) => res.send(user));
});

router.post("/login", (req, res) => {

  userModel.findOne({ email: req.body.email }).then((user) => {
    if (user && req.body.password == decryptPassword(user.password)) {

      let ts = Date.now();

      let date_ob = new Date(ts);
      let date = date_ob.getDate();
      let month = date_ob.getMonth() + 1;
      let year = date_ob.getFullYear();
      let today = (year + "-" + month + "-" + date);
      user.lastLogin = today;
      user.save().then(user => res.json({ user: user, success: true }))
    }
    else res.json({ message: "Invalid user account" });
  });
});

router.post("/register", (req, res) => {
  userModel.findOne({ email: req.body.email }).then((exist) => {

    if (exist) res.json({ message: "The email address is already in use by another account." });
    else if (req.body.password.length < 6) res.json({ message: "Password should be at least 6 characters." });
    else {
      let pwd = encryptPassword(req.body.password);
      const userData = new userModel({
        email: req.body.email,
        password: pwd,
        role: 'user',
      });
      userData.save().then((user) => res.send(user));
    }
  });
});

router.get("/", (req, res) => {
  userModel.find({ role: 'admin' }).then((users) => {
    res.json(users);
  });
});

router.post("/update/:id", (req, res) => {
  let myquery = { _id: req.params.id };

  let newvalues = {
    $set: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: encryptPassword(req.body.password),
      phonenumber: req.body.phonenumber,
      role: req.body.role,
    },
  };
  userModel.updateOne(myquery, newvalues).then(user => {
    res.json(req.body)
  })
});

router.delete("/:id", (req, res) => {
  let myquery = { _id: req.params.id };
  userModel.deleteOne(myquery, function (err, result) {
    res.json({ msg: "Success" });
  });
});

router.get("/:id", (req, res) => {
  userModel.findById(req.params.id)
    .then(user => {
      res.json(user)
    })
    .catch(err => res.json({ error: 'No user with such id' }))
})

module.exports = router;
