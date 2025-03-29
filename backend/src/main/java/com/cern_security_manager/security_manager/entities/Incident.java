package com.cern_security_manager.security_manager.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Data
public class Incident {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private LocalDateTime timestamp;

    public enum IncidentStatus {
        OPEN,
        IN_PROGRESS,
        CLOSED
    }

    @Enumerated(EnumType.STRING)
    private IncidentStatus status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User assignedTo;
}