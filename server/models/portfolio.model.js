// MongoDB Schema for a user

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for each portfolio
const portfolioSchema = new Schema({
    // Assumption: a user only has one portfolio
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 1,
    },
    bio: {
      type:String,
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
portfolioSchema.statics.findById = async (id) => {
  const portfolio = await Portfolio.findOne({ _id: id });
  if (!portfolio) return null;
  return portfolio;
}


// Find a portfolio given its owner's username
portfolioSchema.statics.findByUsername = async (username) => {
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

// Create a Portfolio schema on MongoDB
const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;
