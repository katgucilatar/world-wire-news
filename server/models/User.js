/* eslint-disable func-names */
const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const newsSchema = require("./News");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  userDefaultNews: {
    type: String,
    enum: ["World", "Select a country"],
    default: "World",
  },
  selectedCountry: {
    type: String,
    validate: {
      validator: function () {
        return this.userDefaultNews === "Select a country";
      },
    },
  },
  savedNews: [newsSchema],
  resetPasswordToken: {
    // storing reset token
    type: String,
    default: null,
  },
  resetPasswordExpires: {
    // token expiry
    type: Date,
    default: null,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
