const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AcronymSchema = new Schema({
  id: Schema.Types.ObjectId,
  acronym: String,
  spellout: String,
})

const Acronym = mongoose.model('acronym', AcronymSchema)
module.exports = Acronym