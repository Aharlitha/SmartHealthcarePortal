import { useEffect, useState } from "react";

function DoctorDashboard({
  doctor,
  onLogout,
  onAddMedicalRecord,
  onCreateConsultation
}) {

  const [appointments, setAppointments] = useState([]);

  const [showAppointments, setShowAppointments] =
    useState(false);

  const [message, setMessage] = useState("");


  useEffect(() => {

    if (!doctor || !doctor.id) {
      return;
    }

    fetch(
      `http://localhost:8080/smart-healthcare/api/appointments/doctor/${doctor.id}`
    )
      .then((response) => {

        if (!response.ok) {
          throw new Error(
            "Unable to load appointments."
          );
        }

        return response.json();

      })
      .then((data) => {

        setAppointments(data);

      })
      .catch((error) => {

        console.error(
          "Appointment error:",
          error
        );

        setMessage(
          "Unable to load appointments."
        );

      });

  }, [doctor]);


  const handleViewAppointments = () => {

    setShowAppointments(true);

    setMessage("");

  };


  const handleStatusUpdate = async (
    appointmentId,
    status
  ) => {

    try {

      const response = await fetch(
        `http://localhost:8080/smart-healthcare/api/appointments/${appointmentId}/status?status=${status}`,
        {
          method: "PUT"
        }
      );

      const data = await response.text();

      if (!response.ok) {

        setMessage(
          data ||
          "Unable to update appointment."
        );

        return;
      }

      setMessage(
        `Appointment ${status.toLowerCase()} successfully!`
      );

      setAppointments(
        (currentAppointments) =>

          currentAppointments.map(
            (appointment) =>

              appointment.id === appointmentId
                ? {
                    ...appointment,
                    status: status
                  }
                : appointment
          )
      );

    } catch (error) {

      console.error(
        "Status update error:",
        error
      );

      setMessage(
        "Unable to connect to the backend."
      );

    }

  };


  const patientIds = [
    ...new Set(
      appointments.map(
        (appointment) =>
          appointment.patientId
      )
    )
  ];


  return (

    <div className="dashboard">


      {/* NAVBAR */}

      <nav className="dashboard-navbar">

        <div className="dashboard-logo">
          🏥 Smart Healthcare
        </div>

        <button
          className="logout-btn"
          onClick={onLogout}
        >
          Logout
        </button>

      </nav>


      {/* HEADER */}

      <section className="dashboard-header">

        <h1>
          Welcome, {doctor?.name} 👋
        </h1>

        <p>
          Manage your healthcare services from one place.
        </p>

      </section>


      {/* DOCTOR INFORMATION */}

      <section className="doctor-info-card">

        <div className="doctor-icon">
          👨‍⚕️
        </div>

        <h2>
          {doctor?.name}
        </h2>

        <p>
          <strong>Email:</strong>{" "}
          {doctor?.email}
        </p>

        <p>
          <strong>Specialization:</strong>{" "}
          {doctor?.specialization}
        </p>

        <p>
          <strong>Qualification:</strong>{" "}
          {doctor?.qualification}
        </p>

        <p>
          <strong>Experience:</strong>{" "}
          {doctor?.experience} years
        </p>

        <p>
          <strong>Availability:</strong>{" "}
          {doctor?.availability}
        </p>

      </section>


      {/* APPOINTMENTS */}

      <section className="dashboard-card">

        <div className="dashboard-card-icon">
          📅
        </div>

        <h2>
          Appointments
        </h2>

        <p>
          View and manage your upcoming patient appointments.
        </p>

        <button
          className="dashboard-btn"
          onClick={handleViewAppointments}
        >
          View Appointments
        </button>

      </section>


      {/* APPOINTMENT LIST */}

      {showAppointments && (

        <section className="appointments-section">

          <h2>
            📅 Your Appointments
          </h2>


          {appointments.length === 0 ? (

            <p className="empty-message">
              No appointments found.
            </p>

          ) : (

            <div className="appointment-list">

              {appointments.map(
                (appointment) => (

                  <div
                    className="appointment-card"
                    key={appointment.id}
                  >

                    <h3>
                      Appointment #{appointment.id}
                    </h3>


                    <p>
                      <strong>
                        Patient ID:
                      </strong>{" "}
                      {appointment.patientId}
                    </p>


                    <p>
                      <strong>
                        Date:
                      </strong>{" "}
                      {appointment.appointmentDate}
                    </p>


                    <p>
                      <strong>
                        Time:
                      </strong>{" "}
                      {appointment.appointmentTime}
                    </p>


                    <p>
                      <strong>
                        Reason:
                      </strong>{" "}
                      {appointment.reason ||
                        "Not provided"}
                    </p>


                    <p>
                      <strong>
                        Status:
                      </strong>{" "}
                      {appointment.status}
                    </p>


                    {/* ACCEPT / REJECT */}

                    {appointment.status ===
                      "PENDING" && (

                      <div className="appointment-actions">

                        <button
                          className="accept-btn"
                          onClick={() =>
                            handleStatusUpdate(
                              appointment.id,
                              "ACCEPTED"
                            )
                          }
                        >
                          ✓ Accept
                        </button>


                        <button
                          className="reject-btn"
                          onClick={() =>
                            handleStatusUpdate(
                              appointment.id,
                              "REJECTED"
                            )
                          }
                        >
                          ✕ Reject
                        </button>

                      </div>

                    )}


                    {/* MEDICAL RECORD */}

                    {appointment.status ===
                      "ACCEPTED" && (

                      <button
                        className="dashboard-btn"
                        onClick={() =>
                          onAddMedicalRecord(
                            appointment.patientId
                          )
                        }
                      >
                        📋 Add Medical Record
                      </button>

                    )}


                    {/* CONSULTATION */}

                    {appointment.status ===
                      "ACCEPTED" && (

                      <button
                        className="dashboard-btn"
                        onClick={() =>
                          onCreateConsultation(
                            appointment.patientId
                          )
                        }
                      >
                        💬 Create Consultation
                      </button>

                    )}

                  </div>

                )
              )}

            </div>

          )}

        </section>

      )}


      {/* MESSAGE */}

      {message && (

        <p className="message">
          {message}
        </p>

      )}


      {/* MY PATIENTS */}

      <section className="dashboard-card">

        <div className="dashboard-card-icon">
          👥
        </div>

        <h2>
          My Patients
        </h2>

        <p>
          Patients who have booked appointments with you:
        </p>


        {patientIds.length === 0 ? (

          <p className="empty-message">
            No patients found.
          </p>

        ) : (

          <div>

            {patientIds.map(
              (patientId) => (

                <div
                  className="appointment-card"
                  key={patientId}
                >

                  <h3>
                    Patient #{patientId}
                  </h3>


                  <button
                    className="dashboard-btn"
                    onClick={() =>
                      onAddMedicalRecord(
                        patientId
                      )
                    }
                  >
                    📋 Add Medical Record
                  </button>


                  <button
                    className="dashboard-btn"
                    onClick={() =>
                      onCreateConsultation(
                        patientId
                      )
                    }
                  >
                    💬 Create Consultation
                  </button>

                </div>

              )
            )}

          </div>

        )}

      </section>

    </div>

  );
}

export default DoctorDashboard;