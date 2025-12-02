package com.learning.secureelect.repository;

import com.learning.secureelect.entity.Election;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ElectionRepository extends JpaRepository<Election, Long> {
    Optional<Election> findByTitle(String title);
}
