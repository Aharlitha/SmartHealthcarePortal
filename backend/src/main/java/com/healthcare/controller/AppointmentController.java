package com.healthcare.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.healthcare.entity.Appointment;
import com.healthcare.service.AppointmentService;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174"
})
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(
            AppointmentService appointmentService) {

        this.appointmentService = appointmentService;
    }

    @PostMapping
    public ResponseEntity<String> createAppointment(
            @RequestBody Appointment appointment) {

        try {

            appointmentService.createAppointment(
                    appointment
            );

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(
                        "Appointment booked successfully!"
                    );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Appointment>>
            getDoctorAppointments(
                    @PathVariable Long doctorId) {

        return ResponseEntity.ok(
                appointmentService
                        .getDoctorAppointments(
                                doctorId
                        )
        );
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Appointment>>
            getPatientAppointments(
                    @PathVariable Long patientId) {

        return ResponseEntity.ok(
                appointmentService
                        .getPatientAppointments(
                                patientId
                        )
        );
    }

    @PutMapping("/{appointmentId}/status")
    public ResponseEntity<String>
            updateAppointmentStatus(
                    @PathVariable Long appointmentId,
                    @RequestParam String status) {

        try {

            appointmentService
                    .updateAppointmentStatus(
                            appointmentId,
                            status.toUpperCase()
                    );

            return ResponseEntity.ok(
                    "Appointment status updated successfully!"
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }
}