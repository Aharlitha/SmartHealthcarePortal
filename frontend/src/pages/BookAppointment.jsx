import { useState } from "react";

function BookAppointment({
  doctor,
  patient,
  onBack,
  onBookingSuccess
}) {

  const [formData, setFormData] = useState({
    appointmentDate: "",
    appointmentTime: "",
    reason: ""
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {

    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

    setMessage("");
    setSuccess(false);
  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    if (!doctor || !patient) {
      setMessage("Patient or doctor information is missing.");
      return;
    }

    const appointmentData = {
      patientId: patient.id,
      doctorId: doctor.id,
      appointmentDate: formData.appointmentDate,
      appointmentTime: formData.appointmentTime,
      reason: formData.reason,
      status: "PENDING"
    };

    try {

      const response = await fetch(
        "http://localhost:8080/smart-healthcare/api/appointments",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(appointmentData)
        }
      );

      const data = await response.text();

      if (!response.ok) {

        setMessage(
          data || "Unable to book appointment."
        );

        return;
      }

      setSuccess(true);

      setMessage(
        "Appointment booked successfully! 🎉"
      );

      setFormData({
        appointmentDate: "",
        appointmentTime: "",
        reason: ""
      });

    } catch (error) {

      console.error(
        "Appointment booking error:",
        error
      );

      setMessage(
        "Unable to connect to the backend. Please make sure Tomcat is running."
      );
    }
  };

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
            Book Appointment 📅
          </h1>

          <p>
            Schedule an appointment with your selected doctor.
          </p>

        </div>

        <div className="dashboard-card">

          <div className="dashboard-icon">
            👨‍⚕️
          </div>

          <h2>
            Dr. {doctor?.name}
          </h2>

          <p>
            <strong>
              Specialization:
            </strong>{" "}
            {doctor?.specialization}
          </p>

          <p>
            <strong>
              Qualification:
            </strong>{" "}
            {doctor?.qualification}
          </p>

          <p>
            <strong>
              Experience:
            </strong>{" "}
            {doctor?.experience} years
          </p>

          <p>
            <strong>
              Availability:
            </strong>{" "}
            {doctor?.availability}
          </p>

        </div>

        <div className="register-card">

          <h2>
            Appointment Details
          </h2>

          <form onSubmit={handleSubmit}>

            <label>
              Appointment Date
            </label>

            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              required
            />

            <label>
              Appointment Time
            </label>

            <input
              type="time"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
              required
            />

            <label>
              Reason for Consultation
            </label>

            <textarea
              name="reason"
              placeholder="Briefly describe the reason for your appointment"
              value={formData.reason}
              onChange={handleChange}
              rows="4"
            />

            <button type="submit">
              Confirm Appointment
            </button>

            <button
              type="button"
              className="back-button"
              onClick={onBack}
            >
              ← Back to Doctors
            </button>

          </form>

          {message && (
            <p
              className="message"
              style={{
                color: success ? "green" : "red"
              }}
            >
              {message}
            </p>
          )}

        </div>

      </div>

    </div>
  );
}

export default BookAppointment;