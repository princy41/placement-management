const express = require("express");
const mongoose = require("mongoose");


const cors = require("cors");
require("dotenv").config();

const studentRoutes = require("./routes/studentRoutes");
const companyRoutes = require("./routes/companyRoutes");

const jobRoutes = require("./routes/jobRoutes");




const app = express();

app.use(cors());
app.use(express.json());

// Routes

app.use("/api/students", studentRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/jobs", jobRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });

app.get("/", (req, res) => {
  res.json({
    message: "Placement Management API is running",
  });
});