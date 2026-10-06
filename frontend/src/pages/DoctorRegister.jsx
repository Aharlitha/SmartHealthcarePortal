import { useState } from "react";

function DoctorRegister({ onBack }) {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    specialization: "",
    qualification: "",
    experience: "",
    availability: ""
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

    const qualificationPattern =
      /^[A-Za-z][A-Za-z.\s,&-]{1,49}$/;


    /* ========================= */
    /* NAME VALIDATION */
    /* ========================= */

    const trimmedName =
      formData.name.trim();

    if (!namePattern.test(trimmedName)) {

      setMessage(
        "Please enter a valid doctor's name using letters only."
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
    /* SPECIALIZATION */
    /* ========================= */

    if (!formData.specialization) {

      setMessage(
        "Please select a specialization."
      );

      return;
    }


    /* ========================= */
    /* QUALIFICATION */
    /* ========================= */

    const trimmedQualification =
      formData.qualification.trim();

    if (
      !qualificationPattern.test(
        trimmedQualification
      )
    ) {

      setMessage(
        "Please enter a valid qualification."
      );

      return;
    }


    /* ========================= */
    /* EXPERIENCE */
    /* ========================= */

    const experience =
      Number(formData.experience);

    if (
      formData.experience === "" ||
      !Number.isInteger(experience) ||
      experience < 0 ||
      experience > 70
    ) {

      setMessage(
        "Please enter a valid experience between 0 and 70 years."
      );

      return;
    }


    /* ========================= */
    /* AVAILABILITY */
    /* ========================= */

    if (!formData.availability) {

      setMessage(
        "Please select your availability."
      );

      return;
    }


    /* ========================= */
    /* START REGISTRATION */
    /* ========================= */

    setLoading(true);
    setMessage("");


    try {

      const doctorData = {

        name: trimmedName,

        email:
          formData.email.trim(),

        phone:
          formData.phone.trim(),

        password:
          formData.password,

        specialization:
          formData.specialization,

        qualification:
          trimmedQualification,

        experience:
          experience,

        availability:
          formData.availability

      };


      const response = await fetch(
        "http://localhost:8080/smart-healthcare/api/doctors/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body:
            JSON.stringify(doctorData)
        }
      );


      const result =
        await response.text();


      /* ========================= */
      /* SUCCESS */
      /* ========================= */

      if (response.ok) {

        setMessage(
          "Doctor registered successfully! 🎉"
        );


        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          specialization: "",
          qualification: "",
          experience: "",
          availability: ""
        });

      }


      /* ========================= */
      /* BACKEND ERROR */
      /* ========================= */

      else {

        setMessage(
          result ||
          "Doctor registration failed."
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


        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}

        <h1>
          👨‍⚕️ Doctor Registration
        </h1>

        <p>
          Register to provide healthcare services
        </p>


        <form onSubmit={handleSubmit}>


          {/* ========================= */}
          {/* NAME */}
          {/* ========================= */}

          <label>
            Full Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter doctor's full name"
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
            placeholder="Enter doctor's email"
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
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />


          {/* ========================= */}
          {/* SPECIALIZATION */}
          {/* ========================= */}

          <label>
            Specialization
          </label>

          <select
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
          >

            <option value="">
              Select Specialization
            </option>

            <option value="General Physician">
              General Physician
            </option>

            <option value="Cardiologist">
              Cardiologist
            </option>

            <option value="Dermatologist">
              Dermatologist
            </option>

            <option value="Neurologist">
              Neurologist
            </option>

            <option value="Pediatrician">
              Pediatrician
            </option>

            <option value="Orthopedic">
              Orthopedic
            </option>

            <option value="Gynecologist">
              Gynecologist
            </option>

            <option value="ENT Specialist">
              ENT Specialist
            </option>

            <option value="Psychiatrist">
              Psychiatrist
            </option>

          </select>


          {/* ========================= */}
          {/* QUALIFICATION */}
          {/* ========================= */}

          <label>
            Qualification
          </label>

          <input
            type="text"
            name="qualification"
            placeholder="Example: MBBS, MD"
            value={formData.qualification}
            onChange={handleChange}
            required
          />


          {/* ========================= */}
          {/* EXPERIENCE */}
          {/* ========================= */}

          <label>
            Experience (Years)
          </label>

          <input
            type="number"
            name="experience"
            placeholder="Enter years of experience"
            min="0"
            max="70"
            step="1"
            value={formData.experience}
            onChange={handleChange}
            required
          />


          {/* ========================= */}
          {/* AVAILABILITY */}
          {/* ========================= */}

          <label>
            Availability
          </label>

          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            required
          >

            <option value="">
              Select Availability
            </option>

            <option value="Morning">
              Morning
            </option>

            <option value="Afternoon">
              Afternoon
            </option>

            <option value="Evening">
              Evening
            </option>

            <option value="Full Day">
              Full Day
            </option>

          </select>


          {/* ========================= */}
          {/* REGISTER BUTTON */}
          {/* ========================= */}

          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Registering..."
              : "Register Doctor"}

          </button>


          {/* ========================= */}
          {/* BACK BUTTON */}
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


export default DoctorRegister;