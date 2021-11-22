const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: Schema.Types.ObjectId,
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  phonenumber: String,
  role: String,
  lastLogin: String
});

// Compile model from schema
const User = mongoose.model("user", UserSchema);
module.exports = User;
