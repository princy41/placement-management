const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
    },

    website: {
      type: String,
    },

    location: {
      type: String,
      required: true,
    },

    industry: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Company",
  companySchema
);