package com.cern_security_manager.security_manager.controller;

import com.cern_security_manager.security_manager.DTOs.AuthRequest;
import com.cern_security_manager.security_manager.security.JWTUtil;
import com.cern_security_manager.security_manager.security.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService userDetailsService;
    private final JWTUtil jwtUtil;

    @PostMapping("/login")
    public String login(@RequestBody AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        return jwtUtil.generateToken(userDetails);
    }
}
