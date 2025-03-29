package com.cern_security_manager.security_manager.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
public class Staff {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String badgeNumber;

    @Enumerated(EnumType.STRING)
    private AccessLevel accessLevel;

    @Getter
    private boolean active = true;

    @ManyToOne
    @JoinColumn(name = "area_id")
    private Area areaAssigned;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User userAccount; // Relación con la cuenta de login (opcional)

    public enum AccessLevel {
        LOW, MEDIUM, HIGH
    }

}

