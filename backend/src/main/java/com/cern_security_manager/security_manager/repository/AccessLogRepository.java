package com.cern_security_manager.security_manager.repository;

import com.cern_security_manager.security_manager.entities.AccessLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AccessLogRepository extends JpaRepository<AccessLog, Long> {

    List<AccessLog> findByStaffId(Long staffId);

    List<AccessLog> findByAccessTimeBetween(LocalDateTime start, LocalDateTime end);

    List<AccessLog> findByAction(AccessLog.AccessAction action);

    List<AccessLog> findByAccessMethod(AccessLog.AccessMethod method);

    List<AccessLog> findByUsernameSnapshot(String username);

    List<AccessLog> findBySuccess(Boolean success);

    List<AccessLog> findByAreaAccessedId(Long areaId);

    List<AccessLog> findByStaffIdAndAccessTimeBetween(Long staffId, LocalDateTime start, LocalDateTime end);
}

