package com.healthcare.service;

import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.healthcare.entity.Doctor;
import com.healthcare.repository.DoctorRepository;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();


    public DoctorService(DoctorRepository doctorRepository) {

        this.doctorRepository = doctorRepository;
    }


    /* =============================== */
    /* DOCTOR REGISTRATION */
    /* =============================== */

    @Transactional
    public void registerDoctor(Doctor doctor) {

        Doctor existingDoctor =
                doctorRepository.findByEmail(
                        doctor.getEmail()
                );


        if (existingDoctor != null) {

            throw new RuntimeException(
                    "Email is already registered."
            );
        }


        /*
         * Hash the password before
         * storing the doctor in MySQL.
         */

        String hashedPassword =
                passwordEncoder.encode(
                        doctor.getPassword()
                );


        doctor.setPassword(hashedPassword);


        doctorRepository.save(doctor);
    }


    /* =============================== */
    /* GET ALL DOCTORS */
    /* =============================== */

    @Transactional(readOnly = true)
    public List<Doctor> getAllDoctors() {

        return doctorRepository.findAll();
    }


    /* =============================== */
    /* DOCTOR LOGIN */
    /* =============================== */

    @Transactional(readOnly = true)
    public Doctor loginDoctor(
            String email,
            String password) {


        /*
         * Find doctor using email.
         */

        Doctor doctor =
                doctorRepository.findByEmail(email);


        if (doctor == null) {

            throw new RuntimeException(
                    "Invalid email or password."
            );
        }


        /*
         * Compare the entered password
         * with the BCrypt hash stored
         * in the database.
         */

        boolean passwordMatches =
                passwordEncoder.matches(
                        password,
                        doctor.getPassword()
                );


        if (!passwordMatches) {

            throw new RuntimeException(
                    "Invalid email or password."
            );
        }


        return doctor;
    }
}