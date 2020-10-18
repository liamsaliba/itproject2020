// MongoDB Schema for a Portfolio

const mongoose = require("mongoose");
const Page = require("../models/page.model");
const Schema = mongoose.Schema;

// Define the schema for each portfolio
const portfolioSchema = new Schema(
  {
    // Assumption: a user only has one portfolio
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 1,
      maxlength: 30,
    },
    bio: {
      type: String,
      required: false,
    },
    theme: {
      type: String,
      default: "default",
      required: false,
    },
    font: {
      type: String,
      default: "default",
      required: false,
    },
    colour: {
      type: String,
      default: "default",
      required: false,
    },
    avatar: {
      type: String, // ID of avatar media document
      required: false,
    },
  },
  {
    toObject: {
      versionKey: false,
      virtual: true,
      transform(doc, ret) {
        delete ret._id;
      },
    },
  }
);

// Find a portfolio given its unique ID
portfolioSchema.statics.findById = async id => {
  const portfolio = await Portfolio.findOne({ _id: id });
  if (!portfolio) return null;
  return portfolio;
};

// Find a portfolio given its owner's username
portfolioSchema.statics.findByUsername = async username => {
  try {
    const portfolio = await Portfolio.findOne({ username });
    if (!portfolio) {
      return null;
    }
    return portfolio;
  } catch (err) {
    return null;
  }
};

portfolioSchema.statics.findAllPages = async username => {
  try {
    const pages = await Page.find({ username });
    if (!pages) {
      throw Error();
    }
    return pages.map(p => {
      return {
        pageId: p._id,
        name: p.name,
      };
    });
  } catch (err) {
    return null;
  }
};

// Create a Portfolio schema on MongoDB
const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;
