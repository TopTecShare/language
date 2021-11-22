const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
	id: Schema.Types.ObjectId,
	title: String,
	currency: String,
	desc: String
})

const Project = mongoose.model('project', ProjectSchema)
module.exports = Project