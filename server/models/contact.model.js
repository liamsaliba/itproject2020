// MongoDB Schema for a contact

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    portfolio_username: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 30,
    },

    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 30,
    },

    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        lowercase: true,
    },

    message: {
        type: String,
        required: true,
    }

    
},{
    toObject: {
      versionKey: false,
      virtual: true,
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
})

// Create a Portfolio schema on MongoDB
const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
