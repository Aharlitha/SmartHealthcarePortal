import { useState } from "react";

function DoctorConsultations({
  doctor,
  patientId,
  onBack,
  onSuccess
}) {

  const [formData, setFormData] = useState({
    notes: "",
    advice: "",
    prescription: "",
    consultationDate: "",
    consultationTime: ""
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {

    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

    setMessage("");
  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    if (!doctor || !doctor.id) {

      setMessage("Doctor information is missing.");
      setSuccess(false);

      return;
    }

    if (!patientId) {

      setMessage("Patient ID is missing.");
      setSuccess(false);

      return;
    }

    const consultation = {

      doctorId: doctor.id,

      patientId: patientId,

      notes: formData.notes,

      advice: formData.advice,

      prescription: formData.prescription,

      consultationDate:
        formData.consultationDate,

      consultationTime:
        formData.consultationTime

    };

    try {

      const response = await fetch(
        "http://localhost:8080/smart-healthcare/api/consultations",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(consultation)
        }
      );

      const data = await response.text();

      if (!response.ok) {

        setMessage(
          data || "Unable to create consultation."
        );

        setSuccess(false);

        return;
      }

      setMessage(
        "Consultation created successfully! 🎉"
      );

      setSuccess(true);

      setFormData({
        notes: "",
        advice: "",
        prescription: "",
        consultationDate: "",
        consultationTime: ""
      });

      if (onSuccess) {

        setTimeout(() => {
          onSuccess();
        }, 1000);

      }

    } catch (error) {

      console.error(
        "Consultation error:",
        error
      );

      setMessage(
        "Unable to connect to the backend."
      );

      setSuccess(false);
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
            Doctor Consultation 💬
          </h1>

          <p>
            Add consultation details for your patient.
          </p>

        </div>


        <div className="register-card">

          <h2>
            Consultation Details
          </h2>


          <p>
            <strong>
              Doctor ID:
            </strong>{" "}
            {doctor?.id}
          </p>


          <p>
            <strong>
              Patient ID:
            </strong>{" "}
            {patientId}
          </p>


          <form onSubmit={handleSubmit}>

            <label>
              Consultation Date
            </label>

            <input
              type="date"
              name="consultationDate"
              value={formData.consultationDate}
              onChange={handleChange}
              required
            />


            <label>
              Consultation Time
            </label>

            <input
              type="time"
              name="consultationTime"
              value={formData.consultationTime}
              onChange={handleChange}
              required
            />


            <label>
              Consultation Notes
            </label>

            <textarea
              name="notes"
              placeholder="Enter consultation notes"
              value={formData.notes}
              onChange={handleChange}
              rows="5"
              required
            />


            <label>
              Advice
            </label>

            <textarea
              name="advice"
              placeholder="Enter advice for the patient"
              value={formData.advice}
              onChange={handleChange}
              rows="4"
            />


            <label>
              Prescription
            </label>

            <textarea
              name="prescription"
              placeholder="Enter prescription details"
              value={formData.prescription}
              onChange={handleChange}
              rows="4"
            />


            <button type="submit">
              Create Consultation
            </button>


            <button
              type="button"
              className="back-button"
              onClick={onBack}
            >
              ← Back
            </button>

          </form>


          {message && (

            <p
              className="message"
              style={{
                color: success
                  ? "green"
                  : "red"
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

export default DoctorConsultations;