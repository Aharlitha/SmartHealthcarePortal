import { useState } from "react";
import "./App.css";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import DoctorRegister from "./pages/DoctorRegister";
import DoctorLogin from "./pages/DoctorLogin";
import DoctorDashboard from "./pages/DoctorDashboard";

import FindDoctors from "./pages/FindDoctors";
import BookAppointment from "./pages/BookAppointment";
import MyAppointments from "./pages/MyAppointments";

import MedicalHistory from "./pages/MedicalHistory";
import AddMedicalRecord from "./pages/AddMedicalRecord";

import Consultations from "./pages/Consultations";
import DoctorConsultations from "./pages/DoctorConsultations";

import AIHealthAssistant from "./pages/AIHealthAssistant";


function App() {

  const [page, setPage] = useState("home");

  const [loggedInUser, setLoggedInUser] =
    useState(null);

  const [loggedInDoctor, setLoggedInDoctor] =
    useState(null);

  const [selectedDoctor, setSelectedDoctor] =
    useState(null);

  const [selectedPatientId, setSelectedPatientId] =
    useState(null);


  /* ========================= */
  /* PATIENT REGISTER */
  /* ========================= */

  if (page === "register") {

    return (
      <Register
        onBack={() =>
          setPage("home")
        }
      />
    );

  }


  /* ========================= */
  /* PATIENT LOGIN */
  /* ========================= */

  if (page === "login") {

    return (
      <Login

        onBack={() =>
          setPage("home")
        }

        onLoginSuccess={(user) => {

          setLoggedInUser(user);

          setPage("dashboard");

        }}

      />
    );

  }


  /* ========================= */
  /* PATIENT DASHBOARD */
  /* ========================= */

  if (page === "dashboard") {

    return (
      <Dashboard

        user={loggedInUser}

        onLogout={() => {

          setLoggedInUser(null);

          setPage("home");

        }}

        onFindDoctors={() => {

          setPage("find-doctors");

        }}

        onMyAppointments={() => {

          setPage("my-appointments");

        }}

        onMedicalHistory={() => {

          setPage("medical-history");

        }}

        onConsultations={() => {

          setPage("consultations");

        }}

        onAIHealthAssistant={() => {

          setPage("ai-health-assistant");

        }}

      />
    );

  }


  /* ========================= */
  /* FIND DOCTORS */
  /* ========================= */

  if (page === "find-doctors") {

    return (
      <FindDoctors

        onBack={() =>
          setPage("dashboard")
        }

        onBookAppointment={(doctor) => {

          setSelectedDoctor(doctor);

          setPage("book-appointment");

        }}

      />
    );

  }


  /* ========================= */
  /* BOOK APPOINTMENT */
  /* ========================= */

  if (page === "book-appointment") {

    return (
      <BookAppointment

        doctor={selectedDoctor}

        patient={loggedInUser}

        onBack={() =>
          setPage("find-doctors")
        }

        onBookingSuccess={() => {

          setPage("my-appointments");

        }}

      />
    );

  }


  /* ========================= */
  /* MY APPOINTMENTS */
  /* ========================= */

  if (page === "my-appointments") {

    return (
      <MyAppointments

        patient={loggedInUser}

        onBack={() =>
          setPage("dashboard")
        }

      />
    );

  }


  /* ========================= */
  /* MEDICAL HISTORY */
  /* ========================= */

  if (page === "medical-history") {

    return (
      <MedicalHistory

        patient={loggedInUser}

        onBack={() =>
          setPage("dashboard")
        }

      />
    );

  }


  /* ========================= */
  /* PATIENT CONSULTATIONS */
  /* ========================= */

  if (page === "consultations") {

    return (
      <Consultations

        patient={loggedInUser}

        onBack={() =>
          setPage("dashboard")
        }

      />
    );

  }


  /* ========================= */
  /* AI HEALTH ASSISTANT */
  /* ========================= */

  if (page === "ai-health-assistant") {

    return (
      <AIHealthAssistant

        onBack={() =>
          setPage("dashboard")
        }

      />
    );

  }


  /* ========================= */
  /* ADD MEDICAL RECORD */
  /* ========================= */

  if (page === "add-medical-record") {

    return (
      <AddMedicalRecord

        patientId={selectedPatientId}

        onBack={() =>
          setPage("doctor-dashboard")
        }

        onSuccess={() => {

          setPage("doctor-dashboard");

        }}

      />
    );

  }


  /* ========================= */
  /* DOCTOR REGISTER */
  /* ========================= */

  if (page === "doctor-register") {

    return (
      <DoctorRegister

        onBack={() =>
          setPage("home")
        }

      />
    );

  }


  /* ========================= */
  /* DOCTOR LOGIN */
  /* ========================= */

  if (page === "doctor-login") {

    return (
      <DoctorLogin

        onBack={() =>
          setPage("home")
        }

        onLoginSuccess={(doctor) => {

          setLoggedInDoctor(doctor);

          setPage("doctor-dashboard");

        }}

      />
    );

  }


  /* ========================= */
  /* DOCTOR CONSULTATION */
  /* ========================= */

  if (page === "doctor-consultation") {

    return (
      <DoctorConsultations

        doctor={loggedInDoctor}

        patientId={selectedPatientId}

        onBack={() =>
          setPage("doctor-dashboard")
        }

        onSuccess={() =>
          setPage("doctor-dashboard")
        }

      />
    );

  }


  /* ========================= */
  /* DOCTOR DASHBOARD */
  /* ========================= */

  if (page === "doctor-dashboard") {

    return (
      <DoctorDashboard

        doctor={loggedInDoctor}

        onLogout={() => {

          setLoggedInDoctor(null);

          setPage("home");

        }}

        onAddMedicalRecord={(patientId) => {

          setSelectedPatientId(patientId);

          setPage("add-medical-record");

        }}

        onCreateConsultation={(patientId) => {

          setSelectedPatientId(patientId);

          setPage("doctor-consultation");

        }}

      />
    );

  }


  /* ========================= */
  /* HOME PAGE */
  /* ========================= */

  return (

    <div className="app">


      {/* NAVBAR */}

      <nav className="navbar">

        <div className="logo">
          🏥 Smart Healthcare
        </div>


        <div className="nav-links">

          <a href="#home">
            Home
          </a>

          <a href="#services">
            Services
          </a>

          <a href="#about">
            About
          </a>


          <button
            className="login-btn"
            onClick={() =>
              setPage("login")
            }
          >
            Patient Login
          </button>


          <button
            className="login-btn"
            onClick={() =>
              setPage("register")
            }
          >
            Patient Register
          </button>


          <button
            className="login-btn"
            onClick={() =>
              setPage("doctor-login")
            }
          >
            Doctor Login
          </button>


          <button
            className="login-btn"
            onClick={() =>
              setPage("doctor-register")
            }
          >
            Doctor Register
          </button>

        </div>

      </nav>


      {/* HERO */}

      <section
        className="hero"
        id="home"
      >

        <div className="hero-content">

          <p className="welcome">
            WELCOME TO SMART HEALTHCARE
          </p>


          <h1>

            Healthcare Made

            <span>
              {" "}Smarter & Easier
            </span>

          </h1>


          <p className="description">

            Connect with qualified doctors,
            book appointments, manage your
            medical history and get AI-assisted
            health guidance from anywhere.

          </p>


          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() =>
                setPage("register")
              }
            >
              Find a Doctor
            </button>


            <button
              className="secondary-btn"
              onClick={() =>
                setPage("ai-health-assistant")
              }
            >
              AI Health Assistant
            </button>

          </div>

        </div>


        <div className="hero-card">

          <div className="doctor-icon">
            👨‍⚕️
          </div>


          <h2>
            Doctor TeleConsultation
          </h2>


          <p>

            Consult qualified doctors remotely
            and manage your appointments easily.

          </p>


          <button
            className="consult-btn"
            onClick={() =>
              setPage("register")
            }
          >
            Book Consultation
          </button>

        </div>

      </section>


      {/* SERVICES */}

      <section
        className="services"
        id="services"
      >

        <h2>
          Our Services
        </h2>


        <p className="section-description">

          Everything you need for convenient
          digital healthcare

        </p>


        <div className="service-container">


          <div className="service-card">

            <div className="service-icon">
              👨‍⚕️
            </div>

            <h3>
              Find Doctors
            </h3>

            <p>
              Search doctors based on
              specialization and availability.
            </p>

          </div>


          <div className="service-card">

            <div className="service-icon">
              📅
            </div>

            <h3>
              Book Appointments
            </h3>

            <p>
              Schedule appointments with
              your preferred doctor.
            </p>

          </div>


          <div className="service-card">

            <div className="service-icon">
              🤖
            </div>

            <h3>
              AI Health Assistant
            </h3>

            <p>
              Get preliminary health information
              based on your symptoms.
            </p>

          </div>


          <div className="service-card">

            <div className="service-icon">
              💻
            </div>

            <h3>
              TeleConsultation
            </h3>

            <p>
              Connect with doctors remotely
              for consultations.
            </p>

          </div>

        </div>

      </section>


      {/* ABOUT */}

      <section
        className="about"
        id="about"
      >

        <h2>
          About Smart Healthcare
        </h2>


        <p>

          Smart Healthcare is a digital
          healthcare platform designed to
          connect patients with doctors and
          make healthcare services easier to access.

        </p>

      </section>


      {/* FOOTER */}

      <footer>

        <p>
          © 2026 Smart Healthcare Portal
        </p>

      </footer>


    </div>

  );

}

export default App;