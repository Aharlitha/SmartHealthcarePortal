package com.healthcare.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthcare.entity.Consultation;
import com.healthcare.service.ConsultationService;

@RestController
@RequestMapping("/api/consultations")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174"
})
public class ConsultationController {

    private final ConsultationService consultationService;

    public ConsultationController(
            ConsultationService consultationService) {

        this.consultationService =
                consultationService;
    }

    @PostMapping
    public ResponseEntity<String> addConsultation(
            @RequestBody Consultation consultation) {

        try {

            consultationService.addConsultation(
                    consultation
            );

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(
                        "Consultation added successfully!"
                    );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Consultation>>
            getPatientConsultations(
                    @PathVariable Long patientId) {

        return ResponseEntity.ok(
                consultationService
                        .getPatientConsultations(
                                patientId
                        )
        );
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Consultation>>
            getDoctorConsultations(
                    @PathVariable Long doctorId) {

        return ResponseEntity.ok(
                consultationService
                        .getDoctorConsultations(
                                doctorId
                        )
        );
    }
}