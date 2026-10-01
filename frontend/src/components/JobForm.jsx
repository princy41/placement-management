import { useState } from "react";
import api from "../api";

function JobForm({ companies, onJobAdded }) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    location: "",
    jobType: "Full Time",
    salary: "",
    skills: "",
    openings: 1,
    deadline: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.company) {
      alert("Please select a company");
      return;
    }

    try {
      const job = {
        title: formData.title,

        company: formData.company,

        description: formData.description,

        location: formData.location,

        jobType: formData.jobType,

        salary: Number(formData.salary),

        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),

        openings: Number(formData.openings),

        deadline: formData.deadline,
      };

      const response = await api.post(
        "/jobs",
        job
      );

      onJobAdded(response.data);

      setFormData({
        title: "",
        company: "",
        description: "",
        location: "",
        jobType: "Full Time",
        salary: "",
        skills: "",
        openings: 1,
        deadline: "",
      });

      alert("Job added successfully!");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to add job"
      );
    }
  };

  return (
    <div className="form-card">

      <div className="form-title">

        <div className="form-icon">
          💼
        </div>

        <div>
          <h2>Add New Job</h2>

          <p>
            Create a new placement opportunity
          </p>
        </div>

      </div>

      {companies.length === 0 ? (

        <div
          style={{
            padding: "20px",
            background: "#fff7ed",
            borderRadius: "10px",
            color: "#9a3412",
          }}
        >
          ⚠️ Please add a company first
          before creating a job.
        </div>

      ) : (

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            {/* Job Title */}

            <div className="input-group">

              <label>
                Job Title
              </label>

              <input
                name="title"
                placeholder="Software Engineer"
                value={formData.title}
                onChange={handleChange}
                required
              />

            </div>

            {/* Company */}

            <div className="input-group">

              <label>
                Company
              </label>

              <select
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                style={{
                  padding: "12px",
                  border:
                    "1px solid #d1d5db",
                  borderRadius: "8px",
                  background: "white",
                }}
              >

                <option value="">
                  Select Company
                </option>

                {companies.map(
                  (company) => (

                    <option
                      key={company._id}
                      value={company._id}
                    >
                      {company.name}
                    </option>

                  )
                )}

              </select>

            </div>

            {/* Location */}

            <div className="input-group">

              <label>
                Location
              </label>

              <input
                name="location"
                placeholder="Pune"
                value={formData.location}
                onChange={handleChange}
                required
              />

            </div>

            {/* Job Type */}

            <div className="input-group">

              <label>
                Job Type
              </label>

              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                style={{
                  padding: "12px",
                  border:
                    "1px solid #d1d5db",
                  borderRadius: "8px",
                  background: "white",
                }}
              >

                <option value="Full Time">
                  Full Time
                </option>

                <option value="Part Time">
                  Part Time
                </option>

                <option value="Internship">
                  Internship
                </option>

              </select>

            </div>

            {/* Salary */}

            <div className="input-group">

              <label>
                Salary (LPA)
              </label>

              <input
                name="salary"
                type="number"
                step="0.1"
                placeholder="8"
                value={formData.salary}
                onChange={handleChange}
              />

            </div>

            {/* Openings */}

            <div className="input-group">

              <label>
                Number of Openings
              </label>

              <input
                name="openings"
                type="number"
                min="1"
                value={formData.openings}
                onChange={handleChange}
              />

            </div>

            {/* Skills */}

            <div className="input-group">

              <label>
                Required Skills
              </label>

              <input
                name="skills"
                placeholder="Java, Spring Boot, SQL"
                value={formData.skills}
                onChange={handleChange}
              />

            </div>

            {/* Deadline */}

            <div className="input-group">

              <label>
                Application Deadline
              </label>

              <input
                name="deadline"
                type="date"
                value={formData.deadline}
                onChange={handleChange}
              />

            </div>

          </div>

          {/* Description */}

          <div
            className="input-group"
            style={{
              marginTop: "18px",
            }}
          >

            <label>
              Job Description
            </label>

            <textarea
              name="description"
              placeholder="Describe the job..."
              value={formData.description}
              onChange={handleChange}
              rows="4"
              style={{
                padding: "12px",
                border:
                  "1px solid #d1d5db",
                borderRadius: "8px",
                resize: "vertical",
              }}
            />

          </div>

          <button
            className="add-button"
            type="submit"
          >
            + Add Job
          </button>

        </form>

      )}

    </div>
  );
}

export default JobForm;