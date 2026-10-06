import { useEffect, useState } from "react";

function Consultations({ patient, onBack }) {

  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");


  /* ========================= */
  /* FORMAT DATE */
  /* ========================= */

  const formatDate = (dateValue) => {

    if (!dateValue) {
      return "Not provided";
    }

    const value = String(dateValue);


    /* YYYY-MM-DD */

    if (
      /^\d{4}-\d{2}-\d{2}$/.test(value)
    ) {

      const [year, month, day] =
        value.split("-");

      return `${day}/${month}/${year}`;
    }


    /* YYYYMMDD */

    if (
      /^\d{8}$/.test(value)
    ) {

      const year =
        value.substring(0, 4);

      const month =
        value.substring(4, 6);

      const day =
        value.substring(6, 8);

      return `${day}/${month}/${year}`;
    }


    /* If already formatted */

    if (
      /^\d{2}\/\d{2}\/\d{4}$/.test(value)
    ) {

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


    /* HH:MM:SS */

    if (
      /^\d{2}:\d{2}:\d{2}$/.test(value)
    ) {

      return value.substring(0, 5);
    }


    /* HH:MM */

    if (
      /^\d{2}:\d{2}$/.test(value)
    ) {

      return value;
    }


    /* HHMM */

    if (
      /^\d{4}$/.test(value)
    ) {

      const hours =
        value.substring(0, 2);

      const minutes =
        value.substring(2, 4);

      return `${hours}:${minutes}`;
    }


    return value;
  };


  /* ========================= */
  /* LOAD CONSULTATIONS */
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
      `http://localhost:8080/smart-healthcare/api/consultations/patient/${patient.id}`
    )
      .then((response) => {

        if (!response.ok) {

          throw new Error(
            "Unable to load consultations."
          );

        }

        return response.json();

      })
      .then((data) => {

        setConsultations(data);

        setLoading(false);

      })
      .catch((error) => {

        console.error(
          "Consultation error:",
          error
        );

        setMessage(
          "Unable to load consultations."
        );

        setLoading(false);

      });

  }, [patient]);


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
            My Consultations 💬
          </h1>

          <p>
            View your doctor consultations and
            consultation details.
          </p>

        </div>


        {/* ========================= */}
        {/* LOADING */}
        {/* ========================= */}

        {loading && (

          <p>
            Loading consultations...
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
        {/* NO CONSULTATIONS */}
        {/* ========================= */}

        {!loading &&
          !message &&
          consultations.length === 0 && (

            <div className="dashboard-card">

              <div className="dashboard-icon">
                💬
              </div>

              <h2>
                No Consultations
              </h2>

              <p>
                No consultation records are
                available yet.
              </p>

            </div>

          )}


        {/* ========================= */}
        {/* CONSULTATIONS */}
        {/* ========================= */}

        {!loading &&
          consultations.length > 0 && (

            <div className="appointment-list">

              {consultations.map(
                (consultation) => (

                  <div
                    className="appointment-card"
                    key={consultation.id}
                  >


                    <h2>
                      Consultation #{consultation.id}
                    </h2>


                    {/* DOCTOR */}

                    <p>

                      <strong>
                        Doctor ID:
                      </strong>{" "}

                      {consultation.doctorId}

                    </p>


                    {/* DATE */}

                    <p>

                      <strong>
                        Date:
                      </strong>{" "}

                      {formatDate(
                        consultation.consultationDate
                      )}

                    </p>


                    {/* TIME */}

                    <p>

                      <strong>
                        Time:
                      </strong>{" "}

                      {formatTime(
                        consultation.consultationTime
                      )}

                    </p>


                    {/* NOTES */}

                    <p>

                      <strong>
                        Notes:
                      </strong>{" "}

                      {consultation.notes ||
                        "Not provided"}

                    </p>


                    {/* ADVICE */}

                    <p>

                      <strong>
                        Advice:
                      </strong>{" "}

                      {consultation.advice ||
                        "Not provided"}

                    </p>


                    {/* PRESCRIPTION */}

                    <p>

                      <strong>
                        Prescription:
                      </strong>{" "}

                      {consultation.prescription ||
                        "Not provided"}

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


export default Consultations;