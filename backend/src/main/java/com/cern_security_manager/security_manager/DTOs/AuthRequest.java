package com.cern_security_manager.security_manager.DTOs;


import lombok.Getter;

@Getter
public class AuthRequest {
    private String username;
    private String password;

}
