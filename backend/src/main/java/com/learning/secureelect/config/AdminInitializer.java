package com.learning.secureelect.config;

import com.learning.secureelect.entity.User;
import com.learning.secureelect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Value("${app.default.admin.email}")
    private String defaultAdminEmail;

    @Value("${app.default.admin.password}")
    private String defaultAdminPassword;

    @Value("${app.default.admin.name}")
    private String defaultAdminName;

    @Override
    public void run(String... args) throws Exception {

        //check if any user with role ADMIN already exists
        boolean adminExists = userRepository.findAll()
                .stream()
                .anyMatch(u->"ADMIN".equalsIgnoreCase(u.getRole()));

        if( !adminExists) {
            User admin = new User();
            admin.setName(defaultAdminName);
            admin.setEmail(defaultAdminEmail);
            admin.setPasswordHash(passwordEncoder.encode(defaultAdminPassword));
            admin.setRole("ADMIN");
            admin.setVerified(true);
            admin.setVoted(false);

            userRepository.save(admin);
            System.out.println("Default system admin created: " + defaultAdminEmail);
        } else {
            System.out.println("Admin already exits - skipping creation");
        }
    }
}
