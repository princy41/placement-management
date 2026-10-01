const express = require("express");
const Job = require("../models/Job");

const router = express.Router();

// GET all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("company", "name location");

    res.json(jobs);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching jobs",
      error: error.message,
    });
  }
});

// GET job by ID
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(
      req.params.id
    ).populate(
      "company",
      "name location industry"
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching job",
      error: error.message,
    });
  }
});

// CREATE job
router.post("/", async (req, res) => {
  try {
    const job = new Job(req.body);

    const savedJob = await job.save();

    const populatedJob =
      await savedJob.populate(
        "company",
        "name location"
      );

    res.status(201).json(populatedJob);
  } catch (error) {
    res.status(400).json({
      message: "Error creating job",
      error: error.message,
    });
  }
});

// UPDATE job
router.put("/:id", async (req, res) => {
  try {
    const job =
      await Job.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      ).populate(
        "company",
        "name location"
      );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.json(job);
  } catch (error) {
    res.status(400).json({
      message: "Error updating job",
      error: error.message,
    });
  }
});

// DELETE job
router.delete("/:id", async (req, res) => {
  try {
    const job =
      await Job.findByIdAndDelete(
        req.params.id
      );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting job",
      error: error.message,
    });
  }
});

module.exports = router;