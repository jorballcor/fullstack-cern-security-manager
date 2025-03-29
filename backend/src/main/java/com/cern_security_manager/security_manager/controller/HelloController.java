package com.cern_security_manager.security_manager.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class HelloController {

    @GetMapping("/api/hello")
    public String hello() {
        return "Hey from the backend!\n";
    }
}
