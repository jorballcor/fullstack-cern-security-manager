package com.cern_security_manager.security_manager.entities;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Table(name = "users")
public class User {
    @Setter
    @Id
    @SequenceGenerator(name = "user_seq", sequenceName = "user_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
    private Long id;

    @Setter
    @Getter
    private String username;

    @Getter
    @Setter
    private String password;

    @Setter
    @Getter
    @Enumerated(EnumType.STRING)
    private Role role;

    @Setter
    @Getter
    @Column(name = "active")
    private boolean active = true;

    @OneToOne(mappedBy = "userAccount", cascade = CascadeType.ALL)
    private Staff staff;


    public void setStaff(Staff staff) {
        this.staff = staff;
        if (staff != null) {
            staff.setUserAccount(this);
        }
    }

}
