function StudentList({ students, onDelete }) {

  if (students.length === 0) {

    return (

      <div className="empty">

        <div className="empty-icon">
          👨‍🎓
        </div>

        <h3>No students found</h3>

        <p>
          Add your first student to get started.
        </p>

      </div>

    );

  }

  return (

    <div className="student-grid">

      {students.map((student) => (

        <div
          className="student-card"
          key={student._id}
        >

          <div className="student-top">

            <div className="avatar">
              {student.name
                .charAt(0)
                .toUpperCase()}
            </div>

            <div>

              <h3>{student.name}</h3>

              <span>
                {student.course || "Student"}
              </span>

            </div>

          </div>

          <div className="student-info">

            <p>
              📧 {student.email}
            </p>

            <p>
              📱 {student.phone || "Not provided"}
            </p>

            <p>
              🎓 Class of {student.graduationYear || "N/A"}
            </p>

          </div>

          <div className="skills">

            {student.skills?.map(
              (skill, index) => (

                <span key={index}>
                  {skill}
                </span>

              )
            )}

          </div>

          <button
            className="delete-button"
            onClick={() =>
              onDelete(student._id)
            }
          >
            🗑 Delete
          </button>

        </div>

      ))}

    </div>

  );

}

export default StudentList;