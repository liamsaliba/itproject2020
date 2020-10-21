// MongoDB Schema for a user

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("mongoose-type-email");

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
    method: {
      type: [String],
      enum: ["local", "google", "facebook"],
      required: true,
    },
    allowContact: {
      type: Boolean,
      default: false,
    },
    username: {
      type: String, // type of username
      required: true, // username must always be given
      unique: true, // no two usernames can be the same
      trim: true, // trim whitespaces when user enters
      minlength: 1, // usernames must be at least 1 character long
      maxlength: 30, // usernames must be at most 30 characters long
      lowercase: true, // lowercase only
    },
    local: {
      password: {
        type: String,
        //required: true,
        minlength: 6,
      },

      firstName: {
        type: String,
        //required: false,
        //unique: false,
        trim: true,
        minlength: 1,
      },
      middleName: {
        type: String,
        //required: false,
        //unique: false,
        trim: true,
        minlength: 1,
      },
      lastName: {
        type: String,
        //required: false,
        //unique: false,
        trim: true,
        minlength: 1,
      },

      email: {
        type: mongoose.SchemaTypes.Email,
      },
    },
    avatar: {
      type: String, // URL of the avatar
      required: false,
    },
    google: {
      id: {
        type: String,
      },

      email: {
        type: String,
        //required: true,
        trim: true,
        minlength: 1,
        lowercase: true,
      },
    },
    facebook: {
      id: {
        type: String,
      },

      email: {
        type: String,
        //required: true,
        trim: true,
        minlength: 1,
        lowercase: true,
      },
    },
    tokens: [tokenSchema],
  },
  {
    toObject: {
      versionKey: false,
      virtual: true,
      transform(doc, ret) {
        delete ret._id;
        if (ret.local) {
          delete ret.local.password;
          ret.firstName = ret.local.firstName;
          ret.middleName = ret.local.middleName;
          ret.lastName = ret.local.lastName;
          ret.email = ret.local.email;
        }
        delete ret.tokens;
      },
    },
  }
);

// Save a new user
userSchema.pre("save", async function (next) {
  try {
    if (!this.method.includes("local")) {
      next();
    }
    const user = this;

    if (!user.isModified("local.password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(this.local.password, salt);
    this.local.password = passwordHash;

    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.SECRET_KEY
  );
  user.tokens = user.tokens.concat({
    token,
  });

  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    return null;
  }
  const match = await bcrypt.compare(password, user.local.password);
  if (!match) {
    return null;
  }
  return user;
};

userSchema.statics.findByUsername = async username => {
  const user = await User.findOne({ username });
  if (!user) {
    return null;
  }
  const method = user.method;
  if (method == "local") {
    return user.local.email;
  } else if (method == "google") {
    return user.google.email;
  } else if (method == "facebook") {
    return user.facebook.email;
  }
};

// Create a User schema on MongoDB
const User = mongoose.model("User", userSchema);

module.exports = User;
