import { useState } from "react";
import api from "../api";

function CompanyForm({ onCompanyAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    location: "",
    industry: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/companies",
        formData
      );

      onCompanyAdded(response.data);

      setFormData({
        name: "",
        email: "",
        phone: "",
        website: "",
        location: "",
        industry: "",
        description: "",
      });

      alert("Company added successfully!");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to add company"
      );
    }
  };

  return (
    <div className="form-card">

      <div className="form-title">

        <div className="form-icon">
          🏢
        </div>

        <div>
          <h2>Add New Company</h2>

          <p>
            Register a company for campus placement
          </p>
        </div>

      </div>

      <form onSubmit={handleSubmit}>

        <div className="form-grid">

          <div className="input-group">
            <label>Company Name</label>

            <input
              name="name"
              placeholder="e.g. Google"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>

            <input
              name="email"
              type="email"
              placeholder="hr@company.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Phone</label>

            <input
              name="phone"
              placeholder="9876543210"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Website</label>

            <input
              name="website"
              placeholder="https://company.com"
              value={formData.website}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Location</label>

            <input
              name="location"
              placeholder="Pune, Maharashtra"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Industry</label>

            <input
              name="industry"
              placeholder="Technology"
              value={formData.industry}
              onChange={handleChange}
              required
            />
          </div>

        </div>

        <div
          className="input-group"
          style={{ marginTop: "18px" }}
        >
          <label>Description</label>

          <textarea
            name="description"
            placeholder="Company description..."
            value={formData.description}
            onChange={handleChange}
            rows="4"
            style={{
              padding: "12px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              resize: "vertical",
            }}
          />
        </div>

        <button
          className="add-button"
          type="submit"
        >
          + Add Company
        </button>

      </form>

    </div>
  );
}

export default CompanyForm;