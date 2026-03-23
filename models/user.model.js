const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },

    refreshToken: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);



// 🔐 HASH PASSWORD BEFORE SAVE
userSchema.pre("save", async function (next) {

  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);

});



// 🔑 PASSWORD CHECK METHOD
userSchema.methods.isPasswordCorrect = async function (password) {

  return await bcrypt.compare(password, this.password);

};



// ACCESS TOKEN
userSchema.methods.generateAccessToken = function () {

  return jwt.sign(
    { userId: this._id },
    process.env.ACCESS_TOKEN_SECRETKEY,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );

};



// REFRESH TOKEN
userSchema.methods.generateRefreshToken = function () {

  return jwt.sign(
    { userId: this._id },
    process.env.REFRESH_TOKEN_SECRETKEY,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );

};



const User = mongoose.model("User", userSchema);

module.exports = User;