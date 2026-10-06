import { useEffect, useState } from "react";

function MedicalHistory({ patient, onBack }) {

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {

    if (!patient || !patient.id) {
      setMessage("Patient information is missing.");
      setLoading(false);
      return;
    }

    fetch(
      `http://localhost:8080/smart-healthcare/api/medical-history/patient/${patient.id}`
    )
      .then((response) => {

        if (!response.ok) {
          throw new Error(
            "Unable to load medical history."
          );
        }

        return response.json();
      })
      .then((data) => {

        setRecords(data);
        setLoading(false);

      })
      .catch((error) => {

        console.error(
          "Medical history error:",
          error
        );

        setMessage(
          "Unable to load medical history."
        );

        setLoading(false);
      });

  }, [patient]);


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
            Medical History 📁
          </h1>

          <p>
            View your previous medical records and treatments.
          </p>

        </div>


        {loading && (
          <p>
            Loading medical history...
          </p>
        )}


        {message && (
          <p className="message">
            {message}
          </p>
        )}


        {!loading &&
          !message &&
          records.length === 0 && (

            <div className="dashboard-card">

              <div className="dashboard-icon">
                📁
              </div>

              <h2>
                No Medical Records
              </h2>

              <p>
                No medical history records are available yet.
              </p>

            </div>

          )}


        {!loading &&
          records.length > 0 && (

            <div className="appointment-list">

              {records.map((record) => (

                <div
                  className="appointment-card"
                  key={record.id}
                >

                  <h2>
                    Medical Record #{record.id}
                  </h2>


                  <p>
                    <strong>
                      Record Date:
                    </strong>{" "}
                    {record.recordDate}
                  </p>


                  <p>
                    <strong>
                      Symptoms:
                    </strong>{" "}
                    {record.symptoms ||
                      "Not provided"}
                  </p>


                  <p>
                    <strong>
                      Diagnosis:
                    </strong>{" "}
                    {record.diagnosis ||
                      "Not provided"}
                  </p>


                  <p>
                    <strong>
                      Treatment:
                    </strong>{" "}
                    {record.treatment ||
                      "Not provided"}
                  </p>


                  <p>
                    <strong>
                      Medicines:
                    </strong>{" "}
                    {record.medicines ||
                      "Not provided"}
                  </p>

                </div>

              ))}

            </div>

          )}

      </div>

    </div>
  );
}

export default MedicalHistory;