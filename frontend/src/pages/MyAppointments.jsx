import { useEffect, useState } from "react";

function MyAppointments({ patient, onBack }) {

  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);


  /* ========================= */
  /* FORMAT DATE */
  /* ========================= */

  const formatDate = (dateValue) => {

    if (!dateValue) {
      return "Not provided";
    }

    const value = String(dateValue);


    // YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {

      const [year, month, day] =
        value.split("-");

      return `${day}/${month}/${year}`;
    }


    // YYYYMMDD
    if (/^\d{8}$/.test(value)) {

      const year =
        value.substring(0, 4);

      const month =
        value.substring(4, 6);

      const day =
        value.substring(6, 8);

      return `${day}/${month}/${year}`;
    }


    // DD/MM/YYYY
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
      return value;
    }


    return value;
  };


  /* ========================= */
  /* FORMAT TIME */
  /* ========================= */

  const formatTime = (timeValue) => {

    if (!timeValue) {
      return "Not provided";
    }

    const value = String(timeValue);


    // HH:MM:SS
    if (/^\d{2}:\d{2}:\d{2}$/.test(value)) {

      return value.substring(0, 5);
    }


    // HH:MM
    if (/^\d{2}:\d{2}$/.test(value)) {

      return value;
    }


    // HHMM
    if (/^\d{4}$/.test(value)) {

      const hours =
        value.substring(0, 2);

      const minutes =
        value.substring(2, 4);

      return `${hours}:${minutes}`;
    }


    return value;
  };


  /* ========================= */
  /* LOAD APPOINTMENTS */
  /* ========================= */

  useEffect(() => {

    if (!patient || !patient.id) {

      setMessage(
        "Patient information is missing."
      );

      setLoading(false);

      return;
    }


    fetch(
      `http://localhost:8080/smart-healthcare/api/appointments/patient/${patient.id}`
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

        setLoading(false);

      })
      .catch((error) => {

        console.error(
          "Appointment loading error:",
          error
        );

        setMessage(
          "Unable to load appointments."
        );

        setLoading(false);

      });

  }, [patient]);


  /* ========================= */
  /* STATUS CLASS */
  /* ========================= */

  const getStatusClass = (status) => {

    if (status === "ACCEPTED") {
      return "status-accepted";
    }

    if (status === "REJECTED") {
      return "status-rejected";
    }

    return "status-pending";
  };


  return (

    <div className="dashboard-page">


      {/* ========================= */}
      {/* NAVBAR */}
      {/* ========================= */}

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


      {/* ========================= */}
      {/* CONTENT */}
      {/* ========================= */}

      <div className="dashboard-container">


        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}

        <div className="welcome-section">

          <h1>
            My Appointments 📅
          </h1>

          <p>
            View and track your doctor appointments.
          </p>

        </div>


        {/* ========================= */}
        {/* LOADING */}
        {/* ========================= */}

        {loading && (

          <p>
            Loading appointments...
          </p>

        )}


        {/* ========================= */}
        {/* ERROR */}
        {/* ========================= */}

        {message && (

          <p className="message">
            {message}
          </p>

        )}


        {/* ========================= */}
        {/* NO APPOINTMENTS */}
        {/* ========================= */}

        {!loading &&
          !message &&
          appointments.length === 0 && (

            <div className="dashboard-card">

              <div className="dashboard-icon">
                📅
              </div>

              <h2>
                No Appointments
              </h2>

              <p>
                You have not booked any appointments yet.
              </p>

            </div>

          )}


        {/* ========================= */}
        {/* APPOINTMENTS */}
        {/* ========================= */}

        {!loading &&
          appointments.length > 0 && (

            <div className="appointment-list">

              {appointments.map(
                (appointment) => (

                  <div
                    className="appointment-card"
                    key={appointment.id}
                  >

                    <h2>
                      Appointment #{appointment.id}
                    </h2>


                    {/* DOCTOR */}

                    <p>

                      <strong>
                        Doctor ID:
                      </strong>{" "}

                      {appointment.doctorId}

                    </p>


                    {/* DATE */}

                    <p>

                      <strong>
                        Date:
                      </strong>{" "}

                      {formatDate(
                        appointment.appointmentDate
                      )}

                    </p>


                    {/* TIME */}

                    <p>

                      <strong>
                        Time:
                      </strong>{" "}

                      {formatTime(
                        appointment.appointmentTime
                      )}

                    </p>


                    {/* REASON */}

                    <p>

                      <strong>
                        Reason:
                      </strong>{" "}

                      {appointment.reason ||
                        "Not provided"}

                    </p>


                    {/* STATUS */}

                    <p>

                      <strong>
                        Status:
                      </strong>{" "}

                      <span
                        className={getStatusClass(
                          appointment.status
                        )}
                      >
                        {appointment.status}
                      </span>

                    </p>


                  </div>

                )
              )}

            </div>

          )}

      </div>

    </div>

  );
}


export default MyAppointments;