package com.healthcare.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.healthcare.entity.Consultation;
import com.healthcare.repository.ConsultationRepository;

@Service
public class ConsultationService {

    private final ConsultationRepository consultationRepository;

    public ConsultationService(
            ConsultationRepository consultationRepository) {

        this.consultationRepository =
                consultationRepository;
    }

    @Transactional
    public void addConsultation(
            Consultation consultation) {

        consultationRepository.save(
                consultation
        );
    }

    @Transactional(readOnly = true)
    public List<Consultation> getPatientConsultations(
            Long patientId) {

        return consultationRepository
                .findByPatientId(patientId);
    }

    @Transactional(readOnly = true)
    public List<Consultation> getDoctorConsultations(
            Long doctorId) {

        return consultationRepository
                .findByDoctorId(doctorId);
    }
}