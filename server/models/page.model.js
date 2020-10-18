// MongoDB Schema for a Page

const mongoose = require("mongoose");
const Artifact = require("./artifact.model");
const Schema = mongoose.Schema;

// Define the schema for each oage
const pageSchema = new Schema(
  {
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
    artifacts: {
      type: [String],
    },
    type: {
      type: String,
    },
    name: {
      type: String,
      default: "New Page",
    },
    // url: {
    //   type: String,
    // }
  },
  {
    toObject: {
      versionKey: false,
      virtual: true,
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.portfolioId;
        delete ret.__v;
      },
    },
  }
);

// Find a page given its unique ID
pageSchema.statics.findById = async id => {
  const page = await Page.findOne({
    _id: id,
  });
  if (!page) return null;
  return page;
};

// Find a page given its owner's username
pageSchema.statics.findByUsername = async username => {
  try {
    const page = await Page.find({
      username,
    });
    if (!page) {
      return null;
    }
    return page;
  } catch (err) {
    return null;
  }
};

// Find a page given its portfolio ID
pageSchema.statics.findByPortfolioId = async id => {
  const page = await Page.find({
    portfolioId: id,
  });
  if (!page) return null;
  return page;
};

pageSchema.statics.findAllArtifacts = async pageId => {
  try {
    const artifacts = await Artifact.find({
      pageId,
    });
    if (!artifacts) {
      throw Error();
    }
    return artifacts.map(a => {
      return {
        artifactId: a._id,
      };
    });
  } catch (err) {
    return null;
  }
};

// Create a Portfolio schema on MongoDB
const Page = mongoose.model("Page", pageSchema);

module.exports = Page;
