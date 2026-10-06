import { useEffect, useState } from "react";

function FindDoctors({ onBack, onBookAppointment }) {

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {

    fetch(
      "http://localhost:8080/smart-healthcare/api/doctors"
    )
      .then((response) => {

        if (!response.ok) {
          throw new Error("Unable to load doctors.");
        }

        return response.json();
      })
      .then((data) => {

        setDoctors(data);
        setLoading(false);

      })
      .catch((error) => {

        console.error("Doctor loading error:", error);

        setMessage(
          "Unable to load doctors. Please make sure the backend is running."
        );

        setLoading(false);
      });

  }, []);

  return (
    <div className="dashboard-page">

      <nav className="dashboard-navbar">

        <div className="dashboard-logo">
          🏥 Smart Healthcare
        </div>

        <button
          className="logout-btn"
          onClick={onBack}
        >
          ← Back
        </button>

      </nav>

      <div className="dashboard-container">

        <div className="welcome-section">

          <h1>
            Find a Doctor 👨‍⚕️
          </h1>

          <p>
            Search and choose a doctor for your consultation.
          </p>

        </div>

        {loading && (
          <p>
            Loading doctors...
          </p>
        )}

        {message && (
          <p className="message">
            {message}
          </p>
        )}

        {!loading && !message && doctors.length === 0 && (
          <p className="empty-message">
            No doctors are currently registered.
          </p>
        )}

        <div className="dashboard-cards">

          {doctors.map((doctor) => (

            <div
              className="dashboard-card"
              key={doctor.id}
            >

              <div className="dashboard-icon">
                👨‍⚕️
              </div>

              <h2>
                Dr. {doctor.name}
              </h2>

              <p>
                <strong>
                  Specialization:
                </strong>{" "}
                {doctor.specialization}
              </p>

              <p>
                <strong>
                  Qualification:
                </strong>{" "}
                {doctor.qualification}
              </p>

              <p>
                <strong>
                  Experience:
                </strong>{" "}
                {doctor.experience} years
              </p>

              <p>
                <strong>
                  Availability:
                </strong>{" "}
                {doctor.availability}
              </p>

              <button
                onClick={() =>
                  onBookAppointment(doctor)
                }
              >
                Book Appointment
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default FindDoctors;