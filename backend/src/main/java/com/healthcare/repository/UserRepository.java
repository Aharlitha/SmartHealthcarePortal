package com.healthcare.repository;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;

import com.healthcare.entity.User;

@Repository
public class UserRepository {

    private final SessionFactory sessionFactory;

    public UserRepository(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    public void save(User user) {

        Session session = sessionFactory.getCurrentSession();

        session.save(user);
    }

    public User findByEmail(String email) {

        Session session = sessionFactory.getCurrentSession();

        return session.createQuery(
                "FROM User WHERE email = :email",
                User.class
        )
        .setParameter("email", email)
        .uniqueResult();
    }

    public User findByEmailAndPassword(
            String email,
            String password) {

        Session session = sessionFactory.getCurrentSession();

        return session.createQuery(
                "FROM User WHERE email = :email AND password = :password",
                User.class
        )
        .setParameter("email", email)
        .setParameter("password", password)
        .uniqueResult();
    }
}