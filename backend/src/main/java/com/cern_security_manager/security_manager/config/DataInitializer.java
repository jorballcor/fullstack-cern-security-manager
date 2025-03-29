package com.cern_security_manager.security_manager.config;

import com.cern_security_manager.security_manager.entities.Area;
import com.cern_security_manager.security_manager.entities.User;
import com.cern_security_manager.security_manager.entities.Role;
import com.cern_security_manager.security_manager.repository.AreaRepository;
import com.cern_security_manager.security_manager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AreaRepository areaRepository;


    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(Role.ADMIN);
            userRepository.save(admin);
            System.out.println("Admin user created automatically.");
        }

        if (areaRepository.count() == 0) {
            areaRepository.save(new Area("Atlas Control Room"));
            areaRepository.save(new Area("Synchrotron Tunnel"));
            areaRepository.save(new Area("Cryogenics Lab"));
            areaRepository.save(new Area("Data Center"));
            areaRepository.save(new Area("Antimatter Research Facility"));
            System.out.println("Default CERN areas created.");
        }

    }
}
