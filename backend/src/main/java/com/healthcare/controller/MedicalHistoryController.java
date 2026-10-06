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

import com.healthcare.entity.MedicalHistory;
import com.healthcare.service.MedicalHistoryService;

@RestController
@RequestMapping("/api/medical-history")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174"
})
public class MedicalHistoryController {

    private final MedicalHistoryService medicalHistoryService;

    public MedicalHistoryController(
            MedicalHistoryService medicalHistoryService) {

        this.medicalHistoryService =
                medicalHistoryService;
    }

    @PostMapping
    public ResponseEntity<String> addMedicalHistory(
            @RequestBody MedicalHistory medicalHistory) {

        try {

            medicalHistoryService.addMedicalHistory(
                    medicalHistory
            );

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(
                        "Medical history added successfully!"
                    );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<MedicalHistory>>
            getPatientMedicalHistory(
                    @PathVariable Long patientId) {

        return ResponseEntity.ok(
                medicalHistoryService
                        .getPatientMedicalHistory(
                                patientId
                        )
        );
    }
}