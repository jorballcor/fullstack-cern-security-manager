package com.cern_security_manager.security_manager.repository;

import com.cern_security_manager.security_manager.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}

