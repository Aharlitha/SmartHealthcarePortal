package com.healthcare.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.healthcare.entity.User;
import com.healthcare.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();


    public UserService(UserRepository userRepository) {

        this.userRepository = userRepository;
    }


    /* =============================== */
    /* PATIENT REGISTRATION */
    /* =============================== */

    @Transactional
    public void registerUser(User user) {

        User existingUser =
                userRepository.findByEmail(
                        user.getEmail()
                );


        if (existingUser != null) {

            throw new RuntimeException(
                    "Email is already registered."
            );
        }


        /*
         * Convert the plain-text password
         * into a BCrypt hash before saving.
         */

        String hashedPassword =
                passwordEncoder.encode(
                        user.getPassword()
                );


        user.setPassword(hashedPassword);


        userRepository.save(user);
    }


    /* =============================== */
    /* PATIENT LOGIN */
    /* =============================== */

    @Transactional(readOnly = true)
    public User loginUser(
            String email,
            String password) {


        /*
         * Find the user only by email.
         */

        User user =
                userRepository.findByEmail(email);


        if (user == null) {

            throw new RuntimeException(
                    "Invalid email or password."
            );
        }


        /*
         * Compare the entered password
         * with the BCrypt password stored
         * in the database.
         */

        boolean passwordMatches =
                passwordEncoder.matches(
                        password,
                        user.getPassword()
                );


        if (!passwordMatches) {

            throw new RuntimeException(
                    "Invalid email or password."
            );
        }


        return user;
    }
}