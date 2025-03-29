package com.cern_security_manager.security_manager.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class AccessLog {

    public enum AccessAction {
        LOGIN_SUCCESS,
        LOGIN_FAILED,
        ACCESS_GRANTED,
        ACCESS_DENIED,
        DATA_VIEWED,
        DATA_MODIFIED,
        BADGE_SCANNED,
        TOKEN_VERIFIED,
        PERMISSION_CHANGED
    }

    public enum AccessMethod {
        BADGE,
        PASSWORD,
        BIOMETRIC,
        QR_CODE,
        NFC,
        API,
        ADMIN_PANEL
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "staff_id", nullable = false)
    private Staff staff;

    @ManyToOne
    @JoinColumn(name = "area_id", nullable = false)
    private Area areaAccessed;

    private LocalDateTime accessTime;

    @Enumerated(EnumType.STRING)
    private AccessAction action;

    @Enumerated(EnumType.STRING)
    private AccessMethod accessMethod;

    private String ipAddress;

    private String description;

    private Boolean success;

    private String usernameSnapshot;

    private String badgeUsed;

    public void setStaff(Staff staff) {
        this.staff = staff;
        if (staff != null && staff.getUserAccount() != null) {
            this.usernameSnapshot = staff.getUserAccount().getUsername();
        }
    }
}


