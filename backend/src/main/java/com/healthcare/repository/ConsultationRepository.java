package com.healthcare.repository;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;

import com.healthcare.entity.Consultation;

@Repository
public class ConsultationRepository {

    private final SessionFactory sessionFactory;

    public ConsultationRepository(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    public void save(Consultation consultation) {

        Session session = sessionFactory.getCurrentSession();

        session.save(consultation);
    }

    public List<Consultation> findByPatientId(Long patientId) {

        Session session = sessionFactory.getCurrentSession();

        return session.createQuery(
                "FROM Consultation WHERE patientId = :patientId",
                Consultation.class
        )
        .setParameter("patientId", patientId)
        .getResultList();
    }

    public List<Consultation> findByDoctorId(Long doctorId) {

        Session session = sessionFactory.getCurrentSession();

        return session.createQuery(
                "FROM Consultation WHERE doctorId = :doctorId",
                Consultation.class
        )
        .setParameter("doctorId", doctorId)
        .getResultList();
    }
}