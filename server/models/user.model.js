// MongoDB Schema for a user

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// JWT Authentication token
const tokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
});

// Define the schema for each user
const userSchema = new Schema(
  {
    username: {
      type: String, // type of username
      required: true, // username must always be given
      unique: true, // no two usernames can be the same
      trim: true, // trim whitespaces when user enters
      minlength: 1, // usernames must be at least 1 character long
      maxlength: 30, // usernames must be at most 30 characters long
      lowercase: true, // lowercase only
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    // TODO: Determine whether any of first, middle, last names is required
    firstName: {
      type: String,
      required: false,
      unique: false,
      trim: true,
      minlength: 1,
    },
    middleName: {
      type: String,
      required: false,
      unique: false,
      trim: true,
      minlength: 1,
    },
    lastName: {
      type: String,
      required: false,
      unique: false,
      trim: true,
      minlength: 1,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },

    tokens: [tokenSchema],
  },
  {
    toObject: {
      versionKey: false,
      virtual: true,
      transform(doc, ret) {
        delete ret._id;
        delete ret.password;
        delete ret.tokens;
      },
    },
  }
);

// Save a new user
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    return null;
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return null;
  }
  return user;
};

// Create a User schema on MongoDB
const User = mongoose.model("User", userSchema);

module.exports = User;
