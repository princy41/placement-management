import { useState } from "react";
import axios from "axios";

function StudentForm({ onStudentAdded }) {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    skills: "",
    graduationYear: "",
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

      const student = {

        name: formData.name,

        email: formData.email,

        phone: formData.phone,

        course: formData.course,

        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),

        graduationYear:
          Number(formData.graduationYear),
      };

      
        const response = await api.post("/students", formData);
        

      onStudentAdded(response.data);

      setFormData({
        name: "",
        email: "",
        phone: "",
        course: "",
        skills: "",
        graduationYear: "",
      });

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to add student"
      );

    }

  };

  return (

    <div className="form-card">

      <div className="form-title">

        <div className="form-icon">
          👤
        </div>

        <div>
          <h2>Add New Student</h2>

          <p>
            Register a student for placement
          </p>
        </div>

      </div>

      <form onSubmit={handleSubmit}>

        <div className="form-grid">

          <div className="input-group">

            <label>Full Name</label>

            <input
              name="name"
              placeholder="Enter full name"
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
              placeholder="student@example.com"
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

            <label>Course</label>

            <input
              name="course"
              placeholder="MSc Computer Science"
              value={formData.course}
              onChange={handleChange}
            />

          </div>

          <div className="input-group">

            <label>Skills</label>

            <input
              name="skills"
              placeholder="Python, Java, SQL"
              value={formData.skills}
              onChange={handleChange}
            />

          </div>

          <div className="input-group">

            <label>Graduation Year</label>

            <input
              name="graduationYear"
              type="number"
              placeholder="2027"
              value={formData.graduationYear}
              onChange={handleChange}
            />

          </div>

        </div>

        <button
          className="add-button"
          type="submit"
        >
          + Add Student
        </button>

      </form>

    </div>

  );
}

export default StudentForm;