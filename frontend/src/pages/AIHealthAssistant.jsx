import { useState } from "react";

function AIHealthAssistant({ onBack }) {

  const [symptoms, setSymptoms] = useState("");
  const [response, setResponse] = useState("");

  const getHealthGuidance = () => {

    const text = symptoms.toLowerCase().trim();

    if (!text) {
      setResponse(
        "Please enter your symptoms first."
      );
      return;
    }

    if (
      text.includes("fever") &&
      text.includes("cough")
    ) {

      setResponse(
        "Your symptoms may occur with common respiratory illnesses. " +
        "Rest, stay hydrated, and monitor your temperature. " +
        "If symptoms become severe or persist, consult a doctor."
      );

    } else if (
      text.includes("headache")
    ) {

      setResponse(
        "For a mild headache, rest in a quiet environment, " +
        "drink enough water, and avoid excessive screen time. " +
        "If the headache is severe, sudden, recurrent, or associated " +
        "with other concerning symptoms, seek medical attention."
      );

    } else if (
      text.includes("cold") ||
      text.includes("runny nose")
    ) {

      setResponse(
        "Cold symptoms are often managed with rest, fluids, " +
        "and adequate sleep. Monitor your symptoms and consult " +
        "a doctor if they worsen or persist."
      );

    } else if (
      text.includes("stomach pain") ||
      text.includes("abdominal pain")
    ) {

      setResponse(
        "Mild stomach discomfort can have many causes. " +
        "Stay hydrated and avoid foods that make the discomfort worse. " +
        "Severe or persistent abdominal pain should be evaluated by a doctor."
      );

    } else if (
      text.includes("sore throat")
    ) {

      setResponse(
        "For a mild sore throat, drink warm fluids and stay hydrated. " +
        "Rest can also help. If you have difficulty breathing or swallowing, " +
        "seek medical attention promptly."
      );

    } else {

      setResponse(
        "I can provide general health information, but I cannot diagnose " +
        "medical conditions. Please consult a qualified healthcare professional " +
        "for an accurate evaluation of your symptoms."
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
            AI Health Assistant 🤖
          </h1>

          <p>
            Enter your symptoms to receive general health guidance.
          </p>

        </div>


        <div className="register-card">

          <h2>
            Symptom Guidance
          </h2>

          <label>
            Describe your symptoms
          </label>

          <textarea
            rows="6"
            placeholder="Example: headache and mild fever"
            value={symptoms}
            onChange={(event) =>
              setSymptoms(event.target.value)
            }
          />

          <button
            onClick={getHealthGuidance}
          >
            🤖 Get Health Guidance
          </button>


          {response && (

            <div className="dashboard-card">

              <div className="dashboard-icon">
                💡
              </div>

              <h2>
                Health Guidance
              </h2>

              <p>
                {response}
              </p>

            </div>

          )}

          <p className="message">
            ⚠️ This assistant provides general health information
            and is not a substitute for professional medical advice.
          </p>

        </div>

      </div>

    </div>

  );
}

export default AIHealthAssistant;