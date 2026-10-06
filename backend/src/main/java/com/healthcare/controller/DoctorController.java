package com.healthcare.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthcare.entity.Doctor;
import com.healthcare.service.DoctorService;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174"
})
public class DoctorController {

    private final DoctorService doctorService;

    public DoctorController(
            DoctorService doctorService) {

        this.doctorService =
                doctorService;
    }

    /* ========================= */
    /* DOCTOR REGISTER */
    /* ========================= */

    @PostMapping("/register")
    public ResponseEntity<String> registerDoctor(
            @RequestBody Doctor doctor) {

        try {

            doctorService.registerDoctor(doctor);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(
                        "Doctor registered successfully!"
                    );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }


    /* ========================= */
    /* DOCTOR LOGIN */
    /* ========================= */

    @PostMapping("/login")
    public ResponseEntity<?> loginDoctor(
            @RequestBody Doctor doctor) {

        try {

            Doctor loggedInDoctor =
                    doctorService.loginDoctor(
                        doctor.getEmail(),
                        doctor.getPassword()
                    );

            return ResponseEntity.ok(
                    loggedInDoctor
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(e.getMessage());
        }
    }


    /* ========================= */
    /* GET ALL DOCTORS */
    /* ========================= */

    @GetMapping
    public ResponseEntity<List<Doctor>>
            getAllDoctors() {

        return ResponseEntity.ok(
                doctorService.getAllDoctors()
        );
    }

}