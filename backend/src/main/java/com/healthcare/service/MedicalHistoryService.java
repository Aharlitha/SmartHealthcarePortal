package com.healthcare.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.healthcare.entity.MedicalHistory;
import com.healthcare.repository.MedicalHistoryRepository;

@Service
public class MedicalHistoryService {

    private final MedicalHistoryRepository medicalHistoryRepository;

    public MedicalHistoryService(
            MedicalHistoryRepository medicalHistoryRepository) {

        this.medicalHistoryRepository =
                medicalHistoryRepository;
    }

    @Transactional
    public void addMedicalHistory(
            MedicalHistory medicalHistory) {

        medicalHistoryRepository.save(
                medicalHistory
        );
    }

    @Transactional(readOnly = true)
    public List<MedicalHistory> getPatientMedicalHistory(
            Long patientId) {

        return medicalHistoryRepository
                .findByPatientId(patientId);
    }
}