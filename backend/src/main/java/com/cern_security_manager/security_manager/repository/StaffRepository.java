package com.cern_security_manager.security_manager.repository;

import com.cern_security_manager.security_manager.entities.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StaffRepository extends JpaRepository<Staff, Long> {}

