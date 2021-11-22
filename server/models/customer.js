const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  id: Schema.Types.ObjectId,
  name: String,
  email: String
});

// Compile model from schema
const Customer = mongoose.model("customer", CustomerSchema);
module.exports = Customer
