package com.cern_security_manager.security_manager.service;

import com.cern_security_manager.security_manager.entities.Incident;
import com.cern_security_manager.security_manager.repository.IncidentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class IncidentService {

    private final IncidentRepository incidentRepository;

    public List<Incident> getAllIncidents() {
        return incidentRepository.findAll();
    }

    public Optional<Incident> getIncidentById(Long id) {
        return incidentRepository.findById(id);
    }

    public Incident createIncident(Incident incident) {
        incident.setTimestamp(LocalDateTime.now());
        if (incident.getStatus() == null) {
            incident.setStatus(Incident.IncidentStatus.OPEN);
        }
        return incidentRepository.save(incident);
    }

    public Incident updateIncident(Long id, Incident updatedIncident) {
        return incidentRepository.findById(id).map(existing -> {
            existing.setDescription(updatedIncident.getDescription());
            existing.setStatus(updatedIncident.getStatus());
            return incidentRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Incident not found"));
    }

    public void deleteIncident(Long id) {
        incidentRepository.deleteById(id);
    }
}
