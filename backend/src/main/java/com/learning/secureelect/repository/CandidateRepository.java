package com.learning.secureelect.repository;

import com.learning.secureelect.entity.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {
    List<Candidate> findByElectionId(Long electionId);
    Optional<Candidate> findByFaction(String faction);
}
