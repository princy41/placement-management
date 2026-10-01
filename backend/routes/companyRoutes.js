const express = require("express");
const Company = require("../models/Company");

const router = express.Router();

// GET all companies
router.get("/", async (req, res) => {
  try {
    const companies = await Company.find();

    res.json(companies);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching companies",
      error: error.message,
    });
  }
});

// GET company by ID
router.get("/:id", async (req, res) => {
  try {
    const company = await Company.findById(
      req.params.id
    );

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    res.json(company);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching company",
      error: error.message,
    });
  }
});

// CREATE company
router.post("/", async (req, res) => {
  try {
    const company = new Company(req.body);

    const savedCompany = await company.save();

    res.status(201).json(savedCompany);
  } catch (error) {
    res.status(400).json({
      message: "Error creating company",
      error: error.message,
    });
  }
});

// UPDATE company
router.put("/:id", async (req, res) => {
  try {
    const company =
      await Company.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    res.json(company);
  } catch (error) {
    res.status(400).json({
      message: "Error updating company",
      error: error.message,
    });
  }
});

// DELETE company
router.delete("/:id", async (req, res) => {
  try {
    const company =
      await Company.findByIdAndDelete(
        req.params.id
      );

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    res.json({
      message: "Company deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting company",
      error: error.message,
    });
  }
});

module.exports = router;