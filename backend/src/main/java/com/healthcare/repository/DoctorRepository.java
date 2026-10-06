package com.healthcare.repository;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;

import com.healthcare.entity.Doctor;

@Repository
public class DoctorRepository {

    private final SessionFactory sessionFactory;

    public DoctorRepository(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    public void save(Doctor doctor) {

        Session session = sessionFactory.getCurrentSession();

        session.save(doctor);
    }

    public Doctor findByEmail(String email) {

        Session session = sessionFactory.getCurrentSession();

        return session.createQuery(
                "FROM Doctor WHERE email = :email",
                Doctor.class
        )
        .setParameter("email", email)
        .uniqueResult();
    }

    public List<Doctor> findAll() {

        Session session = sessionFactory.getCurrentSession();

        return session.createQuery(
                "FROM Doctor",
                Doctor.class
        ).getResultList();
    }
}