const express = require('express')

const router = express.Router()
const user = require('../../models/user')
const CryptoJS = require('crypto-js')

function encryptPassword(password) {
  return CryptoJS.AES.encrypt(password, 'my-secret-key@123').toString();
}

function decryptPassword(password) {
  const bytes = CryptoJS.AES.decrypt(password, 'my-secret-key@123');
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

router.get('/', (req, res) => {
	user.find({ role: 'user' })
		.then(users => {
			res.json(users)
		})
		.catch(err => res.json({ error: 'Something went wrong' }))
})

router.post('/', (req, res) => {
	let pwd = encryptPassword(req.body.password)
	const newUser = new user({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		password: pwd,
		role: 'user'
	})

	newUser.save().then(result => {
		res.json(result)
	})
})

router.delete('/:id', (req, res) => {
	user.findOneAndRemove({ _id: req.params.id })
		.then(result => res.json(result))
})


module.exports = router;