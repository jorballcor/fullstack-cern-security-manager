package com.cern_security_manager.security_manager.repository;


import com.cern_security_manager.security_manager.entities.Incident;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IncidentRepository extends JpaRepository<Incident, Long> {
    // Optional: Add custom query methods later
}
