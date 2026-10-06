import { useState } from "react";

function AddMedicalRecord({ patientId, onBack, onSuccess }) {

  const [formData, setFormData] = useState({
    symptoms: "",
    diagnosis: "",
    treatment: "",
    medicines: "",
    recordDate: ""
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

    if (!patientId) {

      setMessage(
        "Patient ID is required."
      );

      return;
    }

    const medicalRecord = {
      patientId: patientId,
      symptoms: formData.symptoms,
      diagnosis: formData.diagnosis,
      treatment: formData.treatment,
      medicines: formData.medicines,
      recordDate: formData.recordDate
    };


    try {

      const response = await fetch(
        "http://localhost:8080/smart-healthcare/api/medical-history",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(medicalRecord)
        }
      );


      const data = await response.text();


      if (!response.ok) {

        setMessage(
          data || "Unable to add medical record."
        );

        setSuccess(false);

        return;
      }


      setMessage(
        "Medical record added successfully! 🎉"
      );

      setSuccess(true);


      setFormData({
        symptoms: "",
        diagnosis: "",
        treatment: "",
        medicines: "",
        recordDate: ""
      });


      if (onSuccess) {
        onSuccess();
      }


    } catch (error) {

      console.error(
        "Medical record error:",
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
            Add Medical Record 📋
          </h1>

          <p>
            Add the patient's medical information and treatment details.
          </p>

        </div>


        <div className="register-card">

          <h2>
            Medical Record
          </h2>


          <form onSubmit={handleSubmit}>

            <label>
              Record Date
            </label>

            <input
              type="date"
              name="recordDate"
              value={formData.recordDate}
              onChange={handleChange}
              required
            />


            <label>
              Symptoms
            </label>

            <textarea
              name="symptoms"
              placeholder="Enter patient's symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              rows="4"
              required
            />


            <label>
              Diagnosis
            </label>

            <textarea
              name="diagnosis"
              placeholder="Enter diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              rows="3"
            />


            <label>
              Treatment
            </label>

            <textarea
              name="treatment"
              placeholder="Enter treatment or advice"
              value={formData.treatment}
              onChange={handleChange}
              rows="4"
            />


            <label>
              Medicines
            </label>

            <textarea
              name="medicines"
              placeholder="Enter prescribed medicines"
              value={formData.medicines}
              onChange={handleChange}
              rows="3"
            />


            <button type="submit">
              Add Medical Record
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

export default AddMedicalRecord;