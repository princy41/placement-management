import { useEffect, useState } from "react";
import api from "./api";

import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

function App() {
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);

  const [search, setSearch] = useState("");

  const [activeSection, setActiveSection] =
    useState("students");

  const [loading, setLoading] = useState(true);

  // ================================
  // FETCH STUDENTS
  // ================================

  const fetchStudents = async () => {
    try {
      const response = await api.get("/students");

      setStudents(response.data);
    } catch (error) {
      console.error(
        "Error fetching students:",
        error
      );
    }
  };
const fetchJobs = async () => {
  try {
    const response = await api.get("/jobs");
    setJobs(response.data);
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
};
  // ================================
  // FETCH COMPANIES
  // ================================

  const fetchCompanies = async () => {
    try {
      const response = await api.get("/companies");

      setCompanies(response.data);
    } catch (error) {
      console.error(
        "Error fetching companies:",
        error
      );
    }
  };

  // ================================
  // LOAD DATA
  // ================================

  useEffect(() => {
  const loadData = async () => {
    setLoading(true);

    await Promise.all([
      fetchStudents(),
      fetchCompanies(),
      fetchJobs(),
    ]);

    setLoading(false);
  };

  loadData();
}, []);
  // ================================
  // ADD STUDENT
  // ================================

  const handleStudentAdded = (student) => {
    setStudents((prevStudents) => [
      ...prevStudents,
      student,
    ]);
  };

  // ================================
  // DELETE STUDENT
  // ================================

  const handleDeleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/students/${id}`);

      setStudents((prevStudents) =>
        prevStudents.filter(
          (student) => student._id !== id
        )
      );

      alert("Student deleted successfully");
    } catch (error) {
      console.error(
        "Error deleting student:",
        error
      );

      alert("Failed to delete student");
    }
  };

  // ================================
  // FILTER STUDENTS
  // ================================

  const filteredStudents = students.filter(
    (student) => {
      const name =
        student.name?.toLowerCase() || "";

      const email =
        student.email?.toLowerCase() || "";

      const course =
        student.course?.toLowerCase() || "";

      const searchText =
        search.toLowerCase();

      return (
        name.includes(searchText) ||
        email.includes(searchText) ||
        course.includes(searchText)
      );
    }
  );

  // ================================
  // REFRESH DATA
  // ================================

  const refreshData = async () => {
    setLoading(true);

    await Promise.all([
      fetchStudents(),
      fetchCompanies(),
    ]);

    setLoading(false);
  };

  // ================================
  // UI
  // ================================

  return (
    <div className="app">

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <header className="header">

        <div>
          <h1>
            🎓 PlacementHub
          </h1>

          <p>
            Student Placement Management
            System
          </p>
        </div>

        <div className="header-badge">
          <span>●</span>
          System Online
        </div>

      </header>

      {/* ================================= */}
      {/* NAVIGATION */}
      {/* ================================= */}

      <nav
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
          padding: "15px 7%",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >

        <button
          onClick={() =>
            setActiveSection("students")
          }
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            background:
              activeSection === "students"
                ? "#4f46e5"
                : "#f3f4f6",
            color:
              activeSection === "students"
                ? "white"
                : "#374151",
            fontWeight: "bold",
          }}
        >
          👨‍🎓 Students
        </button>

        <button
          onClick={() =>
            setActiveSection("companies")
          }
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            background:
              activeSection === "companies"
                ? "#4f46e5"
                : "#f3f4f6",
            color:
              activeSection === "companies"
                ? "white"
                : "#374151",
            fontWeight: "bold",
          }}
        >
          🏢 Companies
        </button>

        <button
          onClick={() =>
            setActiveSection("jobs")
          }
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            background:
              activeSection === "jobs"
                ? "#4f46e5"
                : "#f3f4f6",
            color:
              activeSection === "jobs"
                ? "white"
                : "#374151",
            fontWeight: "bold",
          }}
        >
          💼 Jobs
        </button>

        <button
          onClick={() =>
            setActiveSection("applications")
          }
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            background:
              activeSection === "applications"
                ? "#4f46e5"
                : "#f3f4f6",
            color:
              activeSection === "applications"
                ? "white"
                : "#374151",
            fontWeight: "bold",
          }}
        >
          📝 Applications
        </button>

        <button
          onClick={refreshData}
          style={{
            marginLeft: "auto",
            padding: "10px 20px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            background: "white",
            cursor: "pointer",
          }}
        >
          🔄 Refresh
        </button>

      </nav>

      {/* ================================= */}
      {/* DASHBOARD STATS */}
      {/* ================================= */}

      <section className="stats">

        {/* STUDENTS */}

        <div className="stat-card">

          <div className="stat-icon">
            👨‍🎓
          </div>

          <div>
            <h3>
              {students.length}
            </h3>

            <p>
              Total Students
            </p>
          </div>

        </div>

        {/* COMPANIES */}

        <div className="stat-card">

          <div className="stat-icon">
            🏢
          </div>

          <div>
            <h3>
              {companies.length}
            </h3>

            <p>
              Companies
            </p>
          </div>

        </div>

        {/* JOBS */}

        <div className="stat-card">

          <div className="stat-icon">
            💼
          </div>

          <div>
            <h3>
              0
            </h3>

            <p>
              Available Jobs
            </p>
          </div>

        </div>

      </section>

      {/* ================================= */}
      {/* LOADING */}
      {/* ================================= */}

      {loading && (
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            color: "#6b7280",
          }}
        >
          Loading data...
        </div>
      )}

      {/* ================================= */}
      {/* STUDENTS SECTION */}
      {/* ================================= */}

      {activeSection === "students" && (

        <>

          <section className="form-section">

            <StudentForm
              onStudentAdded={
                handleStudentAdded
              }
            />

          </section>

          <section className="students-section">

            <div className="section-header">

              <div>

                <h2>
                  Students
                </h2>

                <p>
                  Manage registered students
                </p>

              </div>

              <input
                className="search"
                type="text"
                placeholder="🔍 Search students..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

            <StudentList
              students={filteredStudents}
              onDelete={
                handleDeleteStudent
              }
            />

          </section>

        </>

      )}

      {/* ================================= */}
      {/* COMPANIES SECTION */}
      {/* ================================= */}

      {activeSection === "companies" && (

        <section
          className="students-section"
        >

          <div className="section-header">

            <div>

              <h2>
                🏢 Companies
              </h2>

              <p>
                Companies registered for
                campus placement
              </p>

            </div>

          </div>

          {companies.length === 0 ? (

            <div className="empty">

              <div className="empty-icon">
                🏢
              </div>

              <h3>
                No companies found
              </h3>

              <p>
                Companies will appear here
                once they are added.
              </p>

            </div>

          ) : (

            <div className="student-grid">

              {companies.map(
                (company) => (

                  <div
                    className="student-card"
                    key={company._id}
                  >

                    <div className="student-top">

                      <div className="avatar">
                        🏢
                      </div>

                      <div>

                        <h3>
                          {company.name}
                        </h3>

                        <span>
                          {company.industry ||
                            "Company"}
                        </span>

                      </div>

                    </div>

                    <div
                      className="student-info"
                    >

                      <p>
                        📧{" "}
                        {company.email ||
                          "Not provided"}
                      </p>

                      <p>
                        📱{" "}
                        {company.phone ||
                          "Not provided"}
                      </p>

                      <p>
                        📍{" "}
                        {company.location ||
                          "Not provided"}
                      </p>

                      {company.website && (
                        <p>
                          🌐{" "}
                          {company.website}
                        </p>
                      )}

                    </div>

                    {company.description && (
                      <p
                        style={{
                          color: "#6b7280",
                          marginBottom:
                            "15px",
                        }}
                      >
                        {company.description}
                      </p>
                    )}

                  </div>

                )
              )}

            </div>

          )}

        </section>

      )}

      {/* ================================= */}
      {/* JOBS SECTION */}
      {/* ================================= */}

      {activeSection === "jobs" && (

        <section
          className="students-section"
        >

          <div className="empty">

            <div className="empty-icon">
              💼
            </div>

            <h3>
              {jobs.length}
              <h3>
      
    </h3>

            </h3>

            <p>
              Job management will be
              connected next.
            </p>

          </div>

        </section>

      )}

      {/* ================================= */}
      {/* APPLICATIONS SECTION */}
      {/* ================================= */}

      {activeSection ===
        "applications" && (

        <section
          className="students-section"
        >

          <div className="empty">

            <div className="empty-icon">
              📝
            </div>

            <h3>
              Applications Module
            </h3>

            <p>
              Student job applications
              will be connected next.
            </p>

          </div>

        </section>

      )}

      {/* ================================= */}
      {/* FOOTER */}
      {/* ================================= */}

      <footer
        style={{
          textAlign: "center",
          padding: "30px",
          color: "#6b7280",
          fontSize: "14px",
        }}
      >
        <p>
          © 2026 PlacementHub
        </p>

        <p>
          React • Node.js • Express •
          MongoDB • Docker
        </p>
      </footer>

    </div>
  );
}

export default App;