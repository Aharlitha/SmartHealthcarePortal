package com.healthcare.repository;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;

import com.healthcare.entity.Appointment;

@Repository
public class AppointmentRepository {

    private final SessionFactory sessionFactory;

    public AppointmentRepository(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    public void save(Appointment appointment) {

        Session session = sessionFactory.getCurrentSession();

        session.save(appointment);
    }

    public List<Appointment> findByDoctorId(Long doctorId) {

        Session session = sessionFactory.getCurrentSession();

        return session.createQuery(
                "FROM Appointment WHERE doctorId = :doctorId",
                Appointment.class
        )
        .setParameter("doctorId", doctorId)
        .getResultList();
    }

    public List<Appointment> findByPatientId(Long patientId) {

        Session session = sessionFactory.getCurrentSession();

        return session.createQuery(
                "FROM Appointment WHERE patientId = :patientId",
                Appointment.class
        )
        .setParameter("patientId", patientId)
        .getResultList();
    }

    public Appointment findById(Long id) {

        Session session = sessionFactory.getCurrentSession();

        return session.get(
                Appointment.class,
                id
        );
    }

    public void update(Appointment appointment) {

        Session session = sessionFactory.getCurrentSession();

        session.update(appointment);
    }
}