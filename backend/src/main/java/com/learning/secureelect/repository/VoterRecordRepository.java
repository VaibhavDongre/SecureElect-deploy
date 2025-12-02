package com.learning.secureelect.repository;

import com.learning.secureelect.entity.VoterRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoterRecordRepository extends JpaRepository<VoterRecord, Long> {
    boolean existsByUserIdAndElectionId(Long userId, Long ElectionId);
}
