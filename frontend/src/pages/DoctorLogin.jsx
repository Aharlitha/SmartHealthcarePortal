import { useState } from "react";

function DoctorLogin({ onBack, onLoginSuccess }) {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {

    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

    setMessage("");
  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    try {

      const response = await fetch(
        "http://localhost:8080/smart-healthcare/api/doctors/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(formData)
        }
      );

      // Read the backend response as text first
      const data = await response.text();

      // If login failed
      if (!response.ok) {

        setMessage(
          data || "Invalid email or password."
        );

        return;
      }

      // Convert successful JSON response into doctor object
      const doctor = JSON.parse(data);

      console.log("Doctor Login:", doctor);

      // Send logged-in doctor information to App.jsx
      onLoginSuccess(doctor);

    } catch (error) {

      console.error(
        "Doctor login error:",
        error
      );

      setMessage(
        "Unable to connect to the backend. Please make sure Tomcat is running."
      );
    }
  };

  return (
    <div className="register-page">

      <div className="register-card">

        <h1>
          👨‍⚕️ Doctor Login
        </h1>

        <p>
          Login to access your Smart Healthcare doctor account
        </p>

        <form onSubmit={handleSubmit}>

          {/* Email */}

          <label>
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Password */}

          <label>
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* Login Button */}

          <button type="submit">
            Login
          </button>

          {/* Back Button */}

          <button
            type="button"
            className="back-button"
            onClick={onBack}
          >
            ← Back to Home
          </button>

        </form>

        {/* Message */}

        {message && (
          <p className="message">
            {message}
          </p>
        )}

      </div>

    </div>
  );
}

export default DoctorLogin;