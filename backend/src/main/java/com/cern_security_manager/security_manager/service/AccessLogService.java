package com.cern_security_manager.security_manager.service;

import com.cern_security_manager.security_manager.entities.AccessLog;
import com.cern_security_manager.security_manager.repository.AccessLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AccessLogService {

    private final AccessLogRepository accessLogRepository;

    public AccessLog logAccess(AccessLog accessLog) {
        accessLog.setAccessTime(LocalDateTime.now());
        return accessLogRepository.save(accessLog);
    }

    public List<AccessLog> getAllLogs() {
        return accessLogRepository.findAll();
    }

    public List<AccessLog> getLogsByStaff(Long staffId) {
        return accessLogRepository.findByStaffId(staffId);
    }

    public List<AccessLog> getLogsByUsername(String username) {
        return accessLogRepository.findByUsernameSnapshot(username);
    }

    public List<AccessLog> getLogsByAction(AccessLog.AccessAction action) {
        return accessLogRepository.findByAction(action);
    }

    public List<AccessLog> getLogsByMethod(AccessLog.AccessMethod method) {
        return accessLogRepository.findByAccessMethod(method);
    }

    public List<AccessLog> getLogsByPeriod(LocalDateTime start, LocalDateTime end) {
        return accessLogRepository.findByAccessTimeBetween(start, end);
    }

    public List<AccessLog> getLogsByArea(Long areaId) {
        return accessLogRepository.findByAreaAccessedId(areaId);
    }

    public List<AccessLog> getLogsBySuccess(Boolean success) {
        return accessLogRepository.findBySuccess(success);
    }
}
