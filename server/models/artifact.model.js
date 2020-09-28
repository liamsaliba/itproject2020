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
  portfolioId: {
    type: String,
    required: true,
  },
  pageId: {
    type: String,
    required: true,
  },
  contents: {
    type: Object,
  },
  type: {
    type: String,
  },
  media: {
    type: [String],
  }
}, {
  toObject: {
    versionKey: false,
    virtual: true,
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.portfolioId;
      delete ret.__v;
    }
  },
});

// Find an artifact given its unique ID
artifactSchema.statics.findById = async id => {
  const artifact = await Artifact.findOne({
    _id: id,
  });
  if (!artifact) return null;
  return artifact;
};

// Find an artifact given its owner's username
artifactSchema.statics.findByUsername = async username => {
  try {
    const artifact = await Artifact.find({
      username,
    });
    return artifact;
  } catch (err) {
    return null;
  }
};

// Find an artifact given its portfolio ID
artifactSchema.statics.findByPortfolioId = async id => {
  try {
    const artifact = await Artifact.find({
      portfolioId: id,
    });
    return artifact;
  } catch (err) {
    return null;
  }
};

// Find an artifact given its page ID
artifactSchema.statics.findByPageId = async id => {
  try {
    const artifact = await Artifact.find({
      pageId: id,
    });
    return artifact;
  } catch (err) {
    return null;
  }
};

// Create a Portfolio schema on MongoDB
const Artifact = mongoose.model("Artifact", artifactSchema);

module.exports = Artifact;