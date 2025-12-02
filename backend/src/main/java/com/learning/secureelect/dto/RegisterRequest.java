package com.learning.secureelect.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegisterRequest {
    @NotBlank(message = "Please enter your name")
    private String name;
    @Email(message = "Please enter a valid email address")
    @NotNull(message = "Please enter your email")
    private String email;
    @NotBlank
    @Size(min = 6, message = "Password must be atleast 6 characters")
    private String password;
}
