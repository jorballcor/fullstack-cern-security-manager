package com.cern_security_manager.security_manager.controller;

import com.cern_security_manager.security_manager.entities.Staff;
import com.cern_security_manager.security_manager.entities.Area;
import com.cern_security_manager.security_manager.repository.StaffRepository;
import com.cern_security_manager.security_manager.repository.AreaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/staff")
@RequiredArgsConstructor
public class StaffController {

    private final StaffRepository staffRepository;
    private final AreaRepository areaRepository;

    @GetMapping
    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    @GetMapping("/{id}")
    public Staff getById(@PathVariable Long id) {
        return staffRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Staff not found."));
    }

    @PostMapping
    public Staff create(@RequestBody CreateStaffRequest request) {
        Area area = areaRepository.findById(request.areaId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not valid Area."));

        Staff staff = new Staff();
        staff.setFirstName(request.firstName());
        staff.setLastName(request.lastName());
        staff.setBadgeNumber(request.badgeNumber());
        staff.setAccessLevel(Staff.AccessLevel.valueOf(request.accessLevel().toUpperCase()));
        staff.setActive(true);
        staff.setAreaAssigned(area);

        return staffRepository.save(staff);
    }

    @PatchMapping("/deactivate/{id}")
    public String deactivate(@PathVariable Long id) {
        Staff staff = staffRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Staff not found."));
        staff.setActive(false);
        staffRepository.save(staff);
        return "Deactivated Staff.";
    }

    @PatchMapping("/reactivate/{id}")
    public String reactivate(@PathVariable Long id) {
        Staff staff = staffRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Staff not found."));
        if (staff.isActive()) return "ℹ️ Ya estaba activo";
        staff.setActive(true);
        staffRepository.save(staff);
        return "Reactivated Staff.";
    }

    @PutMapping("/{id}")
    public Staff update(@PathVariable Long id, @RequestBody UpdateStaffRequest request) {
        Staff staff = staffRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Staff not found."));

        if (request.firstName() != null) staff.setFirstName(request.firstName());
        if (request.lastName() != null) staff.setLastName(request.lastName());
        if (request.badgeNumber() != null) staff.setBadgeNumber(request.badgeNumber());
        if (request.accessLevel() != null) {
            staff.setAccessLevel(Staff.AccessLevel.valueOf(request.accessLevel().toUpperCase()));
        }
        if (request.areaId() != null) {
            Area area = areaRepository.findById(request.areaId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not valid Area."));
            staff.setAreaAssigned(area);
        }

        return staffRepository.save(staff);
    }

    public record UpdateStaffRequest(
            String firstName,
            String lastName,
            String badgeNumber,
            String accessLevel, // LOW, MEDIUM, HIGH
            Long areaId
    ) {}

    public record CreateStaffRequest(
            String firstName,
            String lastName,
            String badgeNumber,
            String accessLevel, // LOW / MEDIUM / HIGH
            Long areaId
    ) {}
}
