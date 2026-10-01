const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    description: {
      type: String,
    },

    location: {
      type: String,
      required: true,
    },

    jobType: {
      type: String,
      enum: [
        "Full Time",
        "Part Time",
        "Internship",
      ],
      default: "Full Time",
    },

    salary: {
      type: Number,
    },

    skills: {
      type: [String],
      default: [],
    },

    openings: {
      type: Number,
      default: 1,
    },

    deadline: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Job",
  jobSchema
);