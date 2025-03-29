package com.cern_security_manager.security_manager.controller;

import com.cern_security_manager.security_manager.entities.Staff;
import com.cern_security_manager.security_manager.entities.User;
import com.cern_security_manager.security_manager.entities.Role;
import com.cern_security_manager.security_manager.repository.AreaRepository;
import com.cern_security_manager.security_manager.repository.StaffRepository;
import com.cern_security_manager.security_manager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AreaRepository areaRepository;
    private final StaffRepository staffRepository;

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public String createUser(@RequestBody CreateUserRequest request) {
        if (userRepository.findByUsername(request.username()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User already exist.");
        }

        Role role;
        try {
            role = Role.valueOf(request.role().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid role.");
        }

        User user = new User();
        user.setUsername(request.username());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole(role);
        user.setActive(true);

        if (request.staff() != null) {
            Staff staff = new Staff();
            staff.setFirstName(request.staff().firstName());
            staff.setLastName(request.staff().lastName());
            staff.setBadgeNumber(request.staff().badgeNumber());
            staff.setAccessLevel(Enum.valueOf(Staff.AccessLevel.class, request.staff().accessLevel()));
            staff.setAreaAssigned(areaRepository.findById(request.staff().areaId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Area not found")));

            staff.setUserAccount(user);
            user.setStaff(staff);
        }

        userRepository.save(user);

        return "User and Staff correctly created.";
    }

    @DeleteMapping("/{username}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deactivateUser(@PathVariable String username) {
        return userRepository.findByUsername(username)
                .map(user -> {
                    user.setActive(false);
                    userRepository.save(user);
                    return "User deactivated";
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found."));
    }



    @PatchMapping("/reactivate/{username}")
    @PreAuthorize("hasRole('ADMIN')")
    public String reactivateUser(@PathVariable String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        if (user.isActive()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User already active");
        }

        user.setActive(true);
        userRepository.save(user);
        return "User reactivated";
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PutMapping("/{username}")
    @PreAuthorize("hasRole('ADMIN')")
    public User updateUser(@PathVariable String username, @RequestBody UpdateUserRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found."));

        if (request.role() != null) {
            try {
                user.setRole(Role.valueOf(request.role().toUpperCase()));
            } catch (IllegalArgumentException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid role.");
            }
        }

        if (request.password() != null && !request.password().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.password()));
        }

        if (request.active() != null) {
            user.setActive(request.active());
        }

        return userRepository.save(user);
    }

    public record UpdateUserRequest(
            String role,
            String password,
            Boolean active
    ) {}

    public record CreateUserRequest(
            String username,
            String password,
            String role,
            CreateStaffRequest staff
    ) {}

    public record CreateStaffRequest(
            String firstName,
            String lastName,
            String badgeNumber,
            String accessLevel,
            Long areaId
    ) {}
}
