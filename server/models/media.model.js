// MongoDB Schema for a Media file
require('mongoose-type-url');

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for each oage
const mediaSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 30,
  },
  url: mongoose.SchemaTypes.Url,
  public_id: {
    type: String,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
  },
}, {
  toObject: {
    versionKey: false,
    virtual: true,
    transform(_doc, ret) {
      ret.id = ret._id;
      delete ret.public_id;
      delete ret._id;
      delete ret.__v;
    }
  },
});

// Find a media given its unique ID
mediaSchema.statics.findById = async id => {
  try {
    const media = await Media.findOne({
      _id: id,
    });
    return media;
  } catch (err) {
    return null;
  }
}

// Find all media given its owner's username
mediaSchema.statics.findByUsername = async username => {
  try {
    const media = await Media.find({
      username,
    });
    return media;
  } catch (err) {
    return null;
  }
};

// Create a Portfolio schema on MongoDB
const Media = mongoose.model("Media", mediaSchema);

module.exports = Media;