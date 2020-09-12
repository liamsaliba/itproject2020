// MongoDB Schema for an Artifact

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for each oage
const artifactSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 30,
  },
  contents: {
    type: [String],
  },
}, {
  toObject: {
    versionKey: false,
    virtual: true,
  },
});

// Find a artifact given its unique ID
artifactSchema.statics.findById = async id => {
  const artifact = await Artifact.findOne({
    _id: id
  });
  if (!artifact) return null;
  return artifact;
};

// Find a artifact given its owner's username
artifactSchema.statics.findByUsername = async username => {
  try {
    const artifact = await Artifact.find({
      username
    });
    return artifact;
  } catch (err) {
    return null;
  }
};

// Find a page given its portfolio ID
artifactSchema.statics.findByPortfolioId = async id => {
  try {
    const artifact = await Artifact.find({
      portfolioId: id
    });
    return artifact;
  } catch (err) {
    return null;
  }
};

// Create a Portfolio schema on MongoDB
const Artifact = mongoose.model("Artifact", artifactSchema);

module.exports = Artifact;