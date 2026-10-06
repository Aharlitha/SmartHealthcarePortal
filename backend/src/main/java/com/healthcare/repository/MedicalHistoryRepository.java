package com.healthcare.repository;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;

import com.healthcare.entity.MedicalHistory;

@Repository
public class MedicalHistoryRepository {

    private final SessionFactory sessionFactory;

    public MedicalHistoryRepository(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    public void save(MedicalHistory medicalHistory) {

        Session session = sessionFactory.getCurrentSession();

        session.save(medicalHistory);
    }

    public List<MedicalHistory> findByPatientId(Long patientId) {

        Session session = sessionFactory.getCurrentSession();

        return session.createQuery(
                "FROM MedicalHistory WHERE patientId = :patientId",
                MedicalHistory.class
        )
        .setParameter("patientId", patientId)
        .getResultList();
    }
}