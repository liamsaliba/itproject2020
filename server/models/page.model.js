// MongoDB Schema for a Page

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for each oage
const pageSchema = new Schema({
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    portfolioId: {
      type: String,
      required: true,
    },
    contents: {
      type: [String],
    },
  },
  {
    toObject: {
      versionKey: false,
      virtual: true,
      transform(doc, ret) {
        delete ret.username;
        delete ret.portfolioId;
      },
    },
  }
);


// Find a page given its unique ID
pageSchema.statics.findById = async (id) => {
  const page = await Page.findOne({ _id: id });
  if (!page) return null;
  return page;
}


// Find a page given its owner's username
pageSchema.statics.findByUsername = async (username) => {
  try {
    const page = await Page.find({ username });
    if (!page) {
      return null;
    }
    return page;
  } catch (err) {
    return null;
  }
};

// Find a page given its portfolio ID
pageSchema.statics.findByPortfolioId = async (id) => {
  const page = await Page.find({ portfolioId: id });
  if (!page) return null;
  return page;
}

// Create a Portfolio schema on MongoDB
const Page = mongoose.model("Page", pageSchema);

module.exports = Page;
