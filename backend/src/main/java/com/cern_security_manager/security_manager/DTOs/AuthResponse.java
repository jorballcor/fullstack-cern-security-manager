package com.cern_security_manager.security_manager.DTOs;


import lombok.Data;

@Data
public class AuthResponse {
    private String token;

    public AuthResponse(String token) {
        this.token = token;
    }

}