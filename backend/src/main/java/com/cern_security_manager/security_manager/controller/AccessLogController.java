package com.cern_security_manager.security_manager.controller;

import com.cern_security_manager.security_manager.entities.AccessLog;
import com.cern_security_manager.security_manager.service.AccessLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/access-logs")
@RequiredArgsConstructor
public class AccessLogController {

    private final AccessLogService accessLogService;

    @PostMapping
    public ResponseEntity<AccessLog> logAccess(@RequestBody AccessLog accessLog) {
        return ResponseEntity.ok(accessLogService.logAccess(accessLog));
    }

    @GetMapping
    public ResponseEntity<List<AccessLog>> getAllLogs() {
        return ResponseEntity.ok(accessLogService.getAllLogs());
    }

    @GetMapping("/staff/{id}")
    public ResponseEntity<List<AccessLog>> getByStaff(@PathVariable Long id) {
        return ResponseEntity.ok(accessLogService.getLogsByStaff(id));
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<List<AccessLog>> getByUsername(@PathVariable String username) {
        return ResponseEntity.ok(accessLogService.getLogsByUsername(username));
    }

    @GetMapping("/action/{action}")
    public ResponseEntity<List<AccessLog>> getByAction(@PathVariable AccessLog.AccessAction action) {
        return ResponseEntity.ok(accessLogService.getLogsByAction(action));
    }

    @GetMapping("/method/{method}")
    public ResponseEntity<List<AccessLog>> getByMethod(@PathVariable AccessLog.AccessMethod method) {
        return ResponseEntity.ok(accessLogService.getLogsByMethod(method));
    }

    @GetMapping("/success/{success}")
    public ResponseEntity<List<AccessLog>> getBySuccess(@PathVariable Boolean success) {
        return ResponseEntity.ok(accessLogService.getLogsBySuccess(success));
    }

    @GetMapping("/area/{areaId}")
    public ResponseEntity<List<AccessLog>> getByArea(@PathVariable Long areaId) {
        return ResponseEntity.ok(accessLogService.getLogsByArea(areaId));
    }

    @GetMapping("/period")
    public ResponseEntity<List<AccessLog>> getByPeriod(@RequestParam LocalDateTime start,
                                                       @RequestParam LocalDateTime end) {
        return ResponseEntity.ok(accessLogService.getLogsByPeriod(start, end));
    }
}

