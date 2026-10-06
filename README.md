# 🏥 AI-Assisted Smart Healthcare & Doctor TeleConsultation Portal

A full-stack web-based healthcare platform that connects patients and doctors through online appointment booking, medical history management, consultations, and AI-assisted symptom guidance.

---

## 📌 Project Overview

The **AI-Assisted Smart Healthcare & Doctor TeleConsultation Portal** is designed to make healthcare services more accessible and convenient.

Patients can register, log in, search for doctors, book appointments, view medical history, access consultation records, and receive general health guidance through an AI-assisted symptom assistant.

Doctors can register, log in, manage appointments, accept or reject requests, add patient medical records, and create consultation records.

---

## 🚀 Features

### 👤 Patient Features

- Patient registration
- Patient login
- Email and phone validation
- Password validation
- Secure password storage using BCrypt
- Patient dashboard
- Search and view doctors
- Book doctor appointments
- View appointment status
- View medical history
- Add medical records
- View consultation details
- AI-assisted symptom guidance
- Logout functionality

### 👨‍⚕️ Doctor Features

- Doctor registration
- Doctor login
- Doctor profile
- View patient appointments
- Accept appointments
- Reject appointments
- View patients
- Add patient medical records
- Create patient consultations
- Add consultation notes
- Add advice
- Add prescription details
- Logout functionality

### 🤖 AI Health Assistant

The project includes an AI-assisted symptom guidance module that provides general health information based on user-entered symptoms.

It can provide basic guidance for symptoms such as:

- Headache
- Fever
- Cough
- Cold
- Runny nose
- Stomach pain
- Sore throat

> ⚠️ The AI Health Assistant provides general health information and is not a substitute for professional medical diagnosis or treatment.

---

## 🛠️ Technologies Used

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- Regular Expressions
- Vite

### Backend

- Java
- Spring MVC
- REST APIs
- Hibernate ORM
- Maven
- Apache Tomcat

### Database

- MySQL

### Security

- BCrypt password hashing

### Development Tools

- Visual Studio Code
- Git
- GitHub
- MySQL Workbench

---

## 🏗️ Project Structure

```text
SmartHealthcarePortal/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/
│   │       │       └── healthcare/
│   │       │           ├── config/
│   │       │           ├── controller/
│   │       │           ├── dto/
│   │       │           ├── entity/
│   │       │           ├── repository/
│   │       │           └── service/
│   │       │
│   │       └── resources/
│   │           └── application.properties
│   │
│   └── pom.xml
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── start-project.bat
├── .gitignore
└── README.md
