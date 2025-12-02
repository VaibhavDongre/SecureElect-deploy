package com.learning.secureelect.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {

    @NotBlank(message = "Enter your registered email")
    @Email(message = "Please enter a valid email address")
    private String email;

    @NotBlank(message = "Enter the password")
    private String password;
}
