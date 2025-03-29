package com.cern_security_manager.security_manager.controller;

import com.cern_security_manager.security_manager.entities.Incident;
import com.cern_security_manager.security_manager.service.IncidentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/incidents")
@RequiredArgsConstructor
public class IncidentController {

    private final IncidentService incidentService;

    @GetMapping
    public ResponseEntity<List<Incident>> getAll() {
        return ResponseEntity.ok(incidentService.getAllIncidents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Incident> getById(@PathVariable Long id) {
        return incidentService.getIncidentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Incident> create(@RequestBody Incident incident) {
        return ResponseEntity.ok(incidentService.createIncident(incident));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Incident> update(@PathVariable Long id, @RequestBody Incident incident) {
        return ResponseEntity.ok(incidentService.updateIncident(id, incident));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        incidentService.deleteIncident(id);
        return ResponseEntity.noContent().build();
    }
}