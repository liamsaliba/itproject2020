// MongoDB Schema for a user
// Author: Josh (joshnguyen99)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for each user
const userSchema = new Schema({
  username: {
    type: String,    // type of username
    required: true,  // username must always be given
    unique: true,    // no two usernames can be the same
    trim: true,      // trim whitespaces when user enters
    minlength: 1,    // usernames must be at least 1 character long
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
});

// Create a User schema on MongoDB
const User = mongoose.model('User', userSchema);

module.exports = User;