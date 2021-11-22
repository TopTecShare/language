const mongoose = require('mongoose')

const Schema = mongoose.Schema

const SubstitutionSchema = new Schema({
  id: Schema.Types.ObjectId,
  substitution: String,
  suggestion: String,
})

const Substitution = mongoose.model('substitution', SubstitutionSchema)
module.exports = Substitution