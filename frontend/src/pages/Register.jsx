import { useState } from "react";

function Register({ onBack }) {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  /* ========================= */
  /* HANDLE INPUT CHANGE */
  /* ========================= */

  const handleChange = (event) => {

    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

    setMessage("");
  };


  /* ========================= */
  /* FORM SUBMIT */
  /* ========================= */

  const handleSubmit = async (event) => {

    event.preventDefault();


    /* ========================= */
    /* REGEX PATTERNS */
    /* ========================= */

    const namePattern =
      /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;

    const emailPattern =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    const phonePattern =
      /^[6-9][0-9]{9}$/;

    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


    /* ========================= */
    /* NAME VALIDATION */
    /* ========================= */

    const trimmedName =
      formData.name.trim();

    if (!namePattern.test(trimmedName)) {

      setMessage(
        "Please enter a valid name using letters only."
      );

      return;
    }


    /* ========================= */
    /* EMAIL VALIDATION */
    /* ========================= */

    if (!emailPattern.test(formData.email)) {

      setMessage(
        "Please enter a valid email address."
      );

      return;
    }


    /* ========================= */
    /* PHONE VALIDATION */
    /* ========================= */

    if (!phonePattern.test(formData.phone)) {

      setMessage(
        "Please enter a valid 10-digit Indian phone number."
      );

      return;
    }


    /* ========================= */
    /* PASSWORD VALIDATION */
    /* ========================= */

    if (!passwordPattern.test(formData.password)) {

      setMessage(
        "Password must be at least 8 characters and contain a letter, number, and special character."
      );

      return;
    }


    /* ========================= */
    /* CONFIRM PASSWORD */
    /* ========================= */

    if (
      formData.password !==
      formData.confirmPassword
    ) {

      setMessage(
        "Passwords do not match."
      );

      return;
    }


    /* ========================= */
    /* DATE OF BIRTH */
    /* ========================= */

    if (!formData.dateOfBirth) {

      setMessage(
        "Please select your date of birth."
      );

      return;
    }


    /* ========================= */
    /* GENDER */
    /* ========================= */

    if (!formData.gender) {

      setMessage(
        "Please select your gender."
      );

      return;
    }


    /* ========================= */
    /* START REGISTRATION */
    /* ========================= */

    setLoading(true);
    setMessage("");


    try {

      const response = await fetch(
        "http://localhost:8080/smart-healthcare/api/users/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            name: trimmedName,

            email:
              formData.email.trim(),

            phone:
              formData.phone.trim(),

            password:
              formData.password,

            dateOfBirth:
              formData.dateOfBirth,

            gender:
              formData.gender

          })
        }
      );


      const result =
        await response.text();


      /* ========================= */
      /* SUCCESS */
      /* ========================= */

      if (response.ok) {

        setMessage(
          "Registration successful! 🎉"
        );


        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          dateOfBirth: "",
          gender: ""
        });

      }


      /* ========================= */
      /* BACKEND ERROR */
      /* ========================= */

      else {

        setMessage(
          result ||
          "Registration failed."
        );

      }

    }


    /* ========================= */
    /* CONNECTION ERROR */
    /* ========================= */

    catch (error) {

      console.error(
        "Registration error:",
        error
      );

      setMessage(
        "Unable to connect to the backend. Please make sure Tomcat is running."
      );

    }


    finally {

      setLoading(false);

    }

  };


  return (

    <div className="register-page">

      <div className="register-card">

        <h1>
          🏥 Create Patient Account
        </h1>


        <p>
          Register to access Smart Healthcare services
        </p>


        <form onSubmit={handleSubmit}>


          {/* ========================= */}
          {/* FULL NAME */}
          {/* ========================= */}

          <label>
            Full Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />


          {/* ========================= */}
          {/* EMAIL */}
          {/* ========================= */}

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


          {/* ========================= */}
          {/* PHONE */}
          {/* ========================= */}

          <label>
            Phone Number
          </label>

          <input
            type="text"
            name="phone"
            placeholder="Enter 10-digit phone number"
            value={formData.phone}
            onChange={handleChange}
            maxLength="10"
            required
          />


          {/* ========================= */}
          {/* PASSWORD */}
          {/* ========================= */}

          <label>
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="At least 8 characters"
            value={formData.password}
            onChange={handleChange}
            required
          />


          <small>
            Password must contain at least 8 characters,
            one letter, one number and one special character.
          </small>


          {/* ========================= */}
          {/* CONFIRM PASSWORD */}
          {/* ========================= */}

          <label>
            Confirm Password
          </label>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />


          {/* ========================= */}
          {/* DATE OF BIRTH */}
          {/* ========================= */}

          <label>
            Date of Birth
          </label>

          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />


          {/* ========================= */}
          {/* GENDER */}
          {/* ========================= */}

          <label>
            Gender
          </label>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >

            <option value="">
              Select Gender
            </option>

            <option value="Female">
              Female
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Other">
              Other
            </option>

          </select>


          {/* ========================= */}
          {/* SUBMIT */}
          {/* ========================= */}

          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Creating Account..."
              : "Create Account"}

          </button>


          {/* ========================= */}
          {/* BACK */}
          {/* ========================= */}

          <button
            type="button"
            className="back-button"
            onClick={onBack}
          >
            ← Back to Home
          </button>


        </form>


        {/* ========================= */}
        {/* MESSAGE */}
        {/* ========================= */}

        {message && (

          <p className="message">
            {message}
          </p>

        )}


      </div>

    </div>

  );
}


export default Register;