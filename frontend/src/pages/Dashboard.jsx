function Dashboard({
  user,
  onLogout,
  onFindDoctors,
  onMyAppointments,
  onMedicalHistory,
  onConsultations,
  onAIHealthAssistant
}) {

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
          onClick={onLogout}
        >
          Logout
        </button>

      </nav>


      {/* ========================= */}
      {/* DASHBOARD */}
      {/* ========================= */}

      <div className="dashboard-container">

        {/* WELCOME SECTION */}

        <div className="welcome-section">

          <h1>
            Welcome, {user?.name} 👋
          </h1>

          <p>
            Manage your healthcare services from one place.
          </p>

        </div>


        {/* ========================= */}
        {/* DASHBOARD CARDS */}
        {/* ========================= */}

        <div className="dashboard-cards">


          {/* ========================= */}
          {/* FIND DOCTORS */}
          {/* ========================= */}

          <div className="dashboard-card">

            <div className="dashboard-icon">
              👨‍⚕️
            </div>

            <h2>
              Find Doctors
            </h2>

            <p>
              Search doctors by specialization and availability.
            </p>

            <button
              onClick={onFindDoctors}
            >
              Find Doctors
            </button>

          </div>


          {/* ========================= */}
          {/* BOOK APPOINTMENT */}
          {/* ========================= */}

          <div className="dashboard-card">

            <div className="dashboard-icon">
              📅
            </div>

            <h2>
              Book Appointment
            </h2>

            <p>
              Schedule an appointment with your preferred doctor.
            </p>

            <button
              onClick={onFindDoctors}
            >
              Book Appointment
            </button>

          </div>


          {/* ========================= */}
          {/* MY APPOINTMENTS */}
          {/* ========================= */}

          <div className="dashboard-card">

            <div className="dashboard-icon">
              📋
            </div>

            <h2>
              My Appointments
            </h2>

            <p>
              View and manage your upcoming appointments.
            </p>

            <button
              onClick={onMyAppointments}
            >
              View Appointments
            </button>

          </div>


          {/* ========================= */}
          {/* MEDICAL HISTORY */}
          {/* ========================= */}

          <div className="dashboard-card">

            <div className="dashboard-icon">
              📁
            </div>

            <h2>
              Medical History
            </h2>

            <p>
              View and manage your medical history.
            </p>

            <button
              onClick={onMedicalHistory}
            >
              Medical History
            </button>

          </div>


          {/* ========================= */}
          {/* CONSULTATIONS */}
          {/* ========================= */}

          <div className="dashboard-card">

            <div className="dashboard-icon">
              💬
            </div>

            <h2>
              Consultations
            </h2>

            <p>
              View your doctor consultations and consultation notes.
            </p>

            <button
              onClick={onConsultations}
            >
              My Consultations
            </button>

          </div>


          {/* ========================= */}
          {/* AI HEALTH ASSISTANT */}
          {/* ========================= */}

          <div className="dashboard-card">

            <div className="dashboard-icon">
              🤖
            </div>

            <h2>
              AI Health Assistant
            </h2>

            <p>
              Get general health information based on your symptoms.
            </p>

            <button
              onClick={() => {

                console.log(
                  "AI Assistant button clicked"
                );

                if (onAIHealthAssistant) {

                  onAIHealthAssistant();

                } else {

                  console.error(
                    "onAIHealthAssistant is not connected"
                  );

                }

              }}
            >
              Open Assistant
            </button>

          </div>


        </div>

      </div>

    </div>
  );
}


export default Dashboard;