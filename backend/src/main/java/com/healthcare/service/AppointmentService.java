package com.healthcare.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.healthcare.entity.Appointment;
import com.healthcare.repository.AppointmentRepository;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    public AppointmentService(
            AppointmentRepository appointmentRepository) {

        this.appointmentRepository = appointmentRepository;
    }

    @Transactional
    public void createAppointment(Appointment appointment) {

        if (appointment.getStatus() == null ||
                appointment.getStatus().isEmpty()) {

            appointment.setStatus("PENDING");
        }

        appointmentRepository.save(appointment);
    }

    @Transactional(readOnly = true)
    public List<Appointment> getDoctorAppointments(
            Long doctorId) {

        return appointmentRepository
                .findByDoctorId(doctorId);
    }

    @Transactional(readOnly = true)
    public List<Appointment> getPatientAppointments(
            Long patientId) {

        return appointmentRepository
                .findByPatientId(patientId);
    }

    @Transactional
    public void updateAppointmentStatus(
            Long appointmentId,
            String status) {

        Appointment appointment =
                appointmentRepository.findById(
                        appointmentId
                );

        if (appointment == null) {

            throw new RuntimeException(
                    "Appointment not found."
            );
        }

        if (!status.equals("ACCEPTED") &&
                !status.equals("REJECTED")) {

            throw new RuntimeException(
                    "Invalid appointment status."
            );
        }

        appointment.setStatus(status);

        appointmentRepository.update(
                appointment
        );
    }
}