const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  rol: {
    type: String,
    required: true,
    unique: true,
  },
  clave: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
  },
});

userSchema.pre("save", function (next) {
  let user = this;
  if (!user.isModified("clave")) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    user.salt = salt;
    bcrypt.hash(user.clave, salt, (err, hash) => {
      if (err) return next(err);
      user.clave = hash;
      next();
    });
  });
});

userSchema.methods.hash = (clave, salt) => {
  return bcrypt.hash(clave, salt);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
